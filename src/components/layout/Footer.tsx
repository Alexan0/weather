export function Footer() {
  return (
    <footer className='mx-auto mt-auto w-full max-w-[1440px] px-5 py-4 text-center text-xs text-foreground-muted sm:px-8'>
      Weather data by{' '}
      <a
        className='font-medium underline-offset-4 hover:underline'
        href='https://open-meteo.com/'
        rel='noreferrer'
        target='_blank'
      >
        Open-Meteo
      </a>
    </footer>
  );
}
