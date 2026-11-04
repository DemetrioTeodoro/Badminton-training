/*
 * Ponte com o app nativo (Capacitor).
 * No APK Android, o Capacitor injeta window.Capacitor com os plugins nativos.
 * No navegador, Native é null e os serviços usam as APIs web.
 */
export const Native = window.Capacitor?.isNativePlatform?.() ? window.Capacitor.Plugins : null;
