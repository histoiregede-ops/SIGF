import { Component, InputSignal, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TypeRegistreService } from '../../../../data/modules/commun/services/type-registre.service';
import feather from 'feather-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexMarkers, ApexGrid } from "ng-apexcharts";
import { Utilisateur } from '../../../../data/modules/auth/models/Utilisateur';
import { NgSelectUtils } from '../../../../data/utils/NgSelectUtils';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeRegistre } from '../../../../data/modules/commun/models/TypeRegistre';
import { StatistiquesControle, StatistiqueService, StatistiquesGlobales, StatistiquesIndexation, StatistiquesQuotasParOperateur, StatistiquesSuiviJournalier } from '../../../../data/modules/indexation/services/statistique.service';
import { ControleurService } from '../../../../data/modules/auth/services/controleur.service';
import { IndexeurService } from '../../../../data/modules/auth/services/indexeur.service';
import { FormatPourcentagePipe } from '../../../../shared/pipes/format-pourcentage.pipe';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CustomMapType, FiltresDonneesUtils } from '../../../../data/utils/FiltresDonneesUtils';
import { NotificationsHandlerService } from '../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../data/interfaces/NotificationAlert';
import { UtilisateurService } from '../../../../data/modules/auth/services/utilisateur.service';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  colors: any[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: any[]
};

const RADIAL_BAR_OPTIONS = {
  hollow: { margin: 0, size: "70%" },
  track: { margin: 1 },
  dataLabels: {
    show: true,
    name: { show: false },
    value: {
      show: !0, fontSize: "16px", fontWeight: 600, offsetY: 8, formatter: (val: number) => {
        let formatPourcentagePipe: FormatPourcentagePipe = new FormatPourcentagePipe()
        return formatPourcentagePipe.transform(val)
      },
    },
  },
}

const PIE_CHART_OPTIONS: ApexChart = { type: "radialBar", width: 105, sparkline: { enabled: !0 } }
const PIE_DATALABELS_OPTIONS: ApexDataLabels = { enabled: false }
const PIE_PLOT_OPTIONS: ApexPlotOptions = { radialBar: RADIAL_BAR_OPTIONS, }

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  chartsReady: boolean = false

  statistiquesGlobales?: StatistiquesGlobales
  statistiquesIndexation?: StatistiquesIndexation
  statistiquesControle?: StatistiquesControle
  statistiquesSuiviJournalier?: StatistiquesSuiviJournalier
  statistiquesQuotasParIndexeur?: StatistiquesQuotasParOperateur[]
  statistiquesQuotasParControleur?: StatistiquesQuotasParOperateur[]

  totalInjectesStatistiquesGlobalesOptions?: PieChartOptions;
  totalAssignesStatistiquesGlobalesOptions?: PieChartOptions;
  totalIndexesStatistiquesGlobalesOptions?: PieChartOptions;
  totalControlesStatistiquesGlobalesOptions?: PieChartOptions;

  totalAssignesStatistiquesIndexationOptions?: PieChartOptions;
  totalAIndexerStatistiquesIndexationOptions?: PieChartOptions;
  totalEnCoursStatistiquesIndexationOptions?: PieChartOptions;
  totalIndexesStatistiquesIndexationOptions?: PieChartOptions;

  totalAssignesStatistiquesControleOptions?: PieChartOptions;
  totalAControlerStatistiquesControleOptions?: PieChartOptions;
  totalEnCoursStatistiquesControleOptions?: PieChartOptions;
  totalControlesStatistiquesControleOptions?: PieChartOptions;

  statistiquesSuiviJournalierOptions?: LineChartOptions;

  listeIndexeurs: Utilisateur[] = []
  listeControleurs: Utilisateur[] = []
  listeTypesRegistre: TypeRegistre[] = []
  selectedTypeRegistreId: string = 'null'

  filtresStatistiquesForm: FormGroup = new FormGroup({
    typeRegistre: new FormControl(null, []),
    indexeur: new FormControl(null, []),
    controleur: new FormControl(null, []),
  })

  filtresStatistiquesQuotasParOperateurForm: FormGroup = new FormGroup({
    typeRegistre: new FormControl(null, []),
  })

  constructor(
    private typeRegistreService: TypeRegistreService,
    private indexeurService: IndexeurService,
    private controleurService: ControleurService,
    private utilisateurService: UtilisateurService,
    private statistiqueService: StatistiqueService,
    private datePipe: DatePipe,
    private titleCasePipe: TitleCasePipe,
    private notificationsHandlerService: NotificationsHandlerService,
  ) {
    // Init charts
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "My-series",
    //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar"
    //   },
    //   title: {
    //     text: undefined,
    //   },
    //   xaxis: {
    //     categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
    //   }
    // };
  }

  ngOnInit(): void {
    this.getTypesRegistre()
    this.getIndexeurs()
    this.getControleurs()
    this.filtrerStatistiques()
    this.filtrerStatistiquesQuotasParOperateur()
  }

  ngAfterViewInit(): void {
    feather.replace();
    // Delay chart rendering until the view is stable to avoid ApexCharts null DOM errors.
    setTimeout(() => {
      this.chartsReady = true
    })
  }

  customUtilisateurSearchFn(term: string, item: Utilisateur) {
    return NgSelectUtils.getInstance().customUtilisateurSearchFn(term, item)
  }

  getTypesRegistre(): void {
    this.typeRegistreService.getAllData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: TypeRegistre[]) => {
          this.listeTypesRegistre = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types de registre'})
        }
      })
  }

  getIndexeurs(): void {
    this.indexeurService.getAllData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: Utilisateur[]) => {
          console.log('[Dashboard] indexeurs charges:', value.length, value)
          if (value.length === 0) {
            this.loadIndexeursFallback()
            return
          }
          this.listeIndexeurs = value
          this.rebuildIndexeurRows()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des indexeurs'})
        }
      })
  }

  private loadIndexeursFallback(): void {
    this.utilisateurService.getAllData({ actif: 'true' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users: Utilisateur[]) => {
          console.log('[Dashboard] fallback utilisateurs->indexeurs:', users.length, users)
          this.listeIndexeurs = users
          this.rebuildIndexeurRows()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
  }

  getControleurs(): void {
    this.controleurService.getAllData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: Utilisateur[]) => {
          console.log('[Dashboard] controleurs charges:', value.length, value)
          this.listeControleurs = value
          this.rebuildControleurRows()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des contrôleurs'})
        }
      })
  }

  filtrerStatistiques(): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresStatistiquesForm.value)
    console.log(filtres)

    this.getStatistiquesGlobales(filtres)
    this.getStatistiquesIndexation(filtres)
    this.getStatistiquesControle(filtres)
    this.getStatistiquesSuiviJournalier(filtres)
  }

  filtrerStatistiquesQuotasParOperateur(): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresStatistiquesQuotasParOperateurForm.value)
    console.log(filtres)

    this.getStatistiquesQuotasParIndexeur(filtres)
    this.getStatistiquesQuotasParControleur(filtres)
  }

  /**
   * Statistiques globales: nombre de documents injectés, nombre de documents assignés, nombre de documents indexés et nombre de documents contrôlés
   */
  getStatistiquesGlobales(filtres?: CustomMapType): void {
    this.statistiqueService.getStatistiquesGlobales(filtres)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: StatistiquesGlobales) => {
          // console.log(value)
          this.statistiquesGlobales = value

          this.initChartStatistiquesGlobales()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des statistiques globales'})
        }
      })
  }

  /**
   * Statistiques d'indexation: nombre de documents assignés pour indexation, nombre de documents restants à indexer, nombre de documents en cours d'indexation et nombre de documents indexés
   */
  getStatistiquesIndexation(filtres?: CustomMapType): void {
    this.statistiqueService.getStatistiquesIndexation(filtres)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: StatistiquesIndexation) => {
          // console.log(value)
          this.statistiquesIndexation = value

          this.initChartStatistiquesIndexation()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des statistiques d\'indexation'})
        }
      })
  }

  /**
   * Statistiques de contrôle: nombre de documents assignés pour contrôle, nombre de documents restants à contrôler, nombre de documents en cours de contrôle et nombre de documents contrôlés
   */
  getStatistiquesControle(filtres?: CustomMapType): void {
    this.statistiqueService.getStatistiquesControle(filtres)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: StatistiquesControle) => {
          // console.log(value)
          this.statistiquesControle = value

          this.initChartStatistiquesControle()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des statistiques de contrôle'})
        }
      })
  }

  /**
   * Statistiques de suivi journalier: avoir suivant les jours le nombre de données indexées, signalées, rejetées et validées
   */
  getStatistiquesSuiviJournalier(filtres?: CustomMapType): void {
    this.statistiqueService.getStatistiquesSuiviJournalier(filtres)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: StatistiquesSuiviJournalier) => {
          console.log(value)
          this.statistiquesSuiviJournalier = value

          this.initChartStatistiquesSuiviJournalier()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des statistiques de suivi journalier'})
        }
      })
  }

  /**
   * Statistiques de quotas par indexeur
   */
  getStatistiquesQuotasParIndexeur(filtres?: CustomMapType): void {
    this.statistiqueService.getStatistiquesQuotasParIndexeur(filtres)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: StatistiquesQuotasParOperateur[]) => {
          console.log(value)
          this.statistiquesQuotasParIndexeur = value
          this.rebuildIndexeurRows()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des statistiques de quoats par indexeur'})
        }
      })
  }

  /**
   * Statistiques de quotas par controleur
   */
  getStatistiquesQuotasParControleur(filtres?: CustomMapType): void {
    this.statistiqueService.getStatistiquesQuotasParControleur(filtres)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: StatistiquesQuotasParOperateur[]) => {
          console.log(value)
          this.statistiquesQuotasParControleur = value
          this.rebuildControleurRows()
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération des statistiques de quotas par contrôleur'})
        }
      })
  }

  // Initialiser les graphiques de statistiques
  initChartStatistiquesGlobales(): void {
    if (this.statistiquesGlobales) {
      this.totalInjectesStatistiquesGlobalesOptions = { series: [this.statistiquesGlobales.injectes.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesGlobales.injectes.pourcentage)] }
      this.totalAssignesStatistiquesGlobalesOptions = { series: [this.statistiquesGlobales.assignes.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesGlobales.assignes.pourcentage)] }
      this.totalIndexesStatistiquesGlobalesOptions = { series: [this.statistiquesGlobales.indexes.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesGlobales.indexes.pourcentage)] }
      this.totalControlesStatistiquesGlobalesOptions = { series: [this.statistiquesGlobales.controles.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesGlobales.controles.pourcentage)] }
    }
  }

  initChartStatistiquesIndexation(): void {
    if (this.statistiquesIndexation) {
      this.totalAssignesStatistiquesIndexationOptions = { series: [this.statistiquesIndexation.assignes.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesIndexation.assignes.pourcentage)] }
      this.totalAIndexerStatistiquesIndexationOptions = { series: [this.statistiquesIndexation.aIndexer.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesIndexation.aIndexer.pourcentage)] }
      this.totalEnCoursStatistiquesIndexationOptions = { series: [this.statistiquesIndexation.enCours.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesIndexation.enCours.pourcentage)] }
      this.totalIndexesStatistiquesIndexationOptions = { series: [this.statistiquesIndexation.indexes.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesIndexation.indexes.pourcentage)] }
    }
  }

  initChartStatistiquesControle(): void {
    if (this.statistiquesControle) {
      this.totalAssignesStatistiquesControleOptions = { series: [this.statistiquesControle.assignes.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesControle.assignes.pourcentage)] }
      this.totalAControlerStatistiquesControleOptions = { series: [this.statistiquesControle.aControler.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesControle.aControler.pourcentage)] }
      this.totalEnCoursStatistiquesControleOptions = { series: [this.statistiquesControle.enCours.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesControle.enCours.pourcentage)] }
      this.totalControlesStatistiquesControleOptions = { series: [this.statistiquesControle.controles.pourcentage], chart: PIE_CHART_OPTIONS, dataLabels: PIE_DATALABELS_OPTIONS, plotOptions: PIE_PLOT_OPTIONS, colors: [this.getColors(this.statistiquesControle.controles.pourcentage)] }
    }
  }

  initChartStatistiquesSuiviJournalier(): void {
    if (this.statistiquesSuiviJournalier) {
      this.statistiquesSuiviJournalierOptions = {
        chart: {
          height: 345,
          type: "line",
          zoom: { enabled: true },
          toolbar: { show: true, tools: { download: false, zoom: false, zoomin: true, zoomout: true } },
        },
        colors: [],
        dataLabels: { enabled: false },
        stroke: { width: 2, curve: "straight", dashArray: [0, 8, 5, 0] },
        series: [
          {
            name: "Indexés",
            data: this.statistiquesSuiviJournalier.indexees,
            color: 'var(--es-info)',
          },
          {
            name: "Signalés",
            data: this.statistiquesSuiviJournalier.signalees,
            color: 'var(--es-warning)',
          },
          {
            name: "Rejetés",
            data: this.statistiquesSuiviJournalier.rejetees,
            color: 'var(--es-danger)',
          },
          {
            name: "Validés",
            data: this.statistiquesSuiviJournalier.validees,
            color: 'var(--es-success)',
          },
        ],
        title: {
          text: undefined,
        },
        markers: { size: 0, hover: { sizeOffset: 6 } },
        xaxis: {
          // Pour les catégories, on va se baser les dates comprises entre la date la plus récente et la date la plus ancienne
          categories: this.statistiquesSuiviJournalier.dates.map((value: Date) => this.titleCasePipe.transform(this.datePipe.transform(value, 'dd MMM YYYY'))),
        },
        grid: { borderColor: "#f1f1f1" },
      }
    }
  }

  // Paramétrage des couleurs
  getColors(pourcentage: number): string {
    if (pourcentage == 100) {
      return 'var(--es-success)'
    }
    else if (pourcentage <= 5) {
      return 'var(--es-danger)'
    }
    else {
      return 'var(--es-info)'
    }
  }

  private rebuildIndexeurRows(): void {
    this.statistiquesQuotasParIndexeur = this.mergeOperateursWithStats(
      this.listeIndexeurs,
      this.statistiquesQuotasParIndexeur
    )
  }

  private rebuildControleurRows(): void {
    this.statistiquesQuotasParControleur = this.mergeOperateursWithStats(
      this.listeControleurs,
      this.statistiquesQuotasParControleur
    )
  }

  private mergeOperateursWithStats(
    operateurs: Utilisateur[],
    statistiques?: StatistiquesQuotasParOperateur[]
  ): StatistiquesQuotasParOperateur[] {
    const statsMap = new Map<string, StatistiquesQuotasParOperateur>()
    ;(statistiques ?? []).forEach((item) => {
      if (item.operateur?.id) {
        statsMap.set(item.operateur.id!.toString(), item)
      }
    })

    return operateurs.map((operateur) => {
      const stat = operateur.id ? statsMap.get(operateur.id!.toString()) : undefined
      if (stat) {
        return stat
      }
      return {
        operateur,
        quota: 0,
        derniereActivite: undefined
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
