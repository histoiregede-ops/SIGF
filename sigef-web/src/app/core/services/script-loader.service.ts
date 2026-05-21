import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadScripts(scriptUrls: string[]): void {
    scriptUrls.forEach((scriptUrl) => {
      const script = this.renderer.createElement('script');
      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      this.renderer.appendChild(document.body, script);
    });
  }
}
