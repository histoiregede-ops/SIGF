/**
 * Index du module de digitalisation
 * Ré-exporte les modules et composants publics
 */

// Composants
export { TitleDigitalizationComponent } from './components/title-digitalization.component';
export { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
export { MetadataEditorComponent } from './components/metadata-editor/metadata-editor.component';

// Sections
export { Section1Component } from './components/metadata-editor/sections/section1.component';
export { Section2Component } from './components/metadata-editor/sections/section2.component';
export { Section3Component } from './components/metadata-editor/sections/section3.component';
export { Section4Component } from './components/metadata-editor/sections/section4.component';
export { Section5Component } from './components/metadata-editor/sections/section5.component';

// Services
export { TitleDocumentService } from './services/title-document.service';

// Modèles
export * from './models/title-document.model';

// Module
export { DigitalizationModule } from './digitalization.module';
export { DigitalizationRoutingModule } from './digitalization-routing.module';
