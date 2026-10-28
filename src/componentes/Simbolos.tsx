/** Ícones usados com `<use href="#...">` (WhatsApp, seta, play e o símbolo da marca). */
export function Simbolos() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-zap" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z"
        />
      </symbol>
      <symbol id="i-seta" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14M13 6l6 6-6 6"
        />
      </symbol>
      <symbol id="i-play" viewBox="0 0 10 10">
        <path d="M2 1l7 4-7 4z" />
      </symbol>
      <symbol id="i-simbolo" viewBox="0 0 100 100">
        <circle cx="50" cy="13" r="7.5" fill="var(--sol)" />
        <path
          d="M64 36 A14 14 0 1 0 50 52 A14 14 0 1 1 36 68 M22 86 H78"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </symbol>
    </svg>
  );
}
