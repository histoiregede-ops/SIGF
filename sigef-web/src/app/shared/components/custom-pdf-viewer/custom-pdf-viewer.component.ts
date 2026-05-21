import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

declare const pdfjsLib: any;

@Component({
  selector: 'app-custom-pdf-viewer',
  templateUrl: './custom-pdf-viewer.component.html',
  styleUrl: './custom-pdf-viewer.component.scss'
})
export class CustomPdfViewerComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() src!: string | Uint8Array
  @Input() page?: number
  @Input() enteteSrc?: string
  @Input() fullScreen: boolean = false
  @Output() fullScreenChange: EventEmitter<boolean> = new EventEmitter()
  @Input() dispositionVerticale: boolean = true
  @Output() dispositionVerticaleChange: EventEmitter<boolean> = new EventEmitter()

  @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>

  zoom: number = 1
  rotation: number = 0
  readonly zoomStep: number = 0.1
  readonly rotationStep: number = 90

  private pdfDoc: any = null
  private rendering = false
  private libLoaded = false

  async ngAfterViewInit(): Promise<void> {
    if (!this.libLoaded) {
      await this.loadPdfJsLib()
    }
    if (this.src && this.libLoaded) {
      await this.loadPdf()
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['src'] && this.libLoaded && this.src) {
      await this.loadPdf()
    }
    if (changes['page'] && this.pdfDoc) {
      await this.renderPage(this.page || 1)
    }
  }

  ngOnDestroy(): void {
    this.pdfDoc = null
  }

  private async loadPdfJsLib(): Promise<void> {
    if (typeof pdfjsLib !== 'undefined') {
      this.libLoaded = true
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.min.mjs'
      return
    }
    try {
      const pdfjsModule = await import('pdfjs-dist/legacy/build/pdf.min.mjs')
      ;(window as any).pdfjsLib = pdfjsModule
      pdfjsModule.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.min.mjs'
      this.libLoaded = true
    } catch (error) {
      throw new Error('Failed to load pdf.js: ' + (error instanceof Error ? error.message : String(error)))
    }
  }

  private async loadPdf(): Promise<void> {
    try {
      const source = typeof this.src === 'string'
        ? { url: this.src }
        : { data: this.src }

      this.pdfDoc = await pdfjsLib.getDocument(source).promise
      await this.renderPage(this.page || 1)
    } catch (error) {
      console.error('Erreur chargement PDF:', error)
    }
  }

  private async renderPage(pageNum: number): Promise<void> {
    if (!this.pdfDoc || this.rendering || !this.pdfCanvas) return
    this.rendering = true

    try {
      const page = await this.pdfDoc.getPage(pageNum)
      const canvas = this.pdfCanvas.nativeElement
      const ctx = canvas.getContext('2d')!

      const viewport = page.getViewport({ scale: this.zoom * (window.devicePixelRatio || 1), rotation: this.rotation })

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({ canvasContext: ctx, viewport }).promise
    } catch (error) {
      console.error('Erreur rendu page:', error)
    } finally {
      this.rendering = false
    }
  }

  rotateLeft(): void {
    this.rotation -= this.rotationStep
    this.renderPage(this.page || 1)
  }

  rotateRight(): void {
    this.rotation += this.rotationStep
    this.renderPage(this.page || 1)
  }

  zoomIn(): void {
    this.zoom = Math.min(this.zoom + this.zoomStep, 3)
    this.renderPage(this.page || 1)
  }

  zoomOut(): void {
    this.zoom = Math.max(this.zoom - this.zoomStep, 0.5)
    this.renderPage(this.page || 1)
  }

  reset(): void {
    this.zoom = 1
    this.rotation = 0
    this.renderPage(this.page || 1)
  }

  toggleFullScreen(): void {
    this.fullScreen = !this.fullScreen
    this.fullScreenChange.emit(this.fullScreen)
  }

  changerDisposition(): void {
    this.dispositionVerticale = !this.dispositionVerticale
    this.dispositionVerticaleChange.emit(this.dispositionVerticale)
    this.zoom = 1
    this.renderPage(this.page || 1)
  }
}
