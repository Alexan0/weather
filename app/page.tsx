import { WeatherBootstrap } from '@/features/weather/WeatherBootstrap';

export default function Home() {
  return (
    <main className='mx-auto flex w-full max-w-[1440px] min-h-0 flex-1 flex-col px-5 pb-8 sm:px-8 xl:pb-0'>
      <h1 className='sr-only'>Weather dashboard</h1>
      <WeatherBootstrap />
    </main>
  );
}
