import { motion } from "framer-motion"

import { default as RadioPlayerComponent } from "./RadioPlayer"
import 'react-h5-audio-player/lib/styles.css';
import logo from '/logo.png';
import { GithubIcon } from "lucide-react";

export default function App() {
  return (
    <main className="flex w-full min-h-screen mt-16 sm:mt-12 flex-col items-center p-4 sm:p-24 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        style={{
          background:
            "linear-gradient(45deg, #f3f4f6 25%, #e5e7eb 25%, #e5e7eb 50%, #f3f4f6 50%, #f3f4f6 75%, #e5e7eb 75%, #e5e7eb 100%)",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="flex flex-col items-center justify-center w-full px-4 sm:px-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} alt="Rádio Gaúcha" className="w-3/4 sm:w-1/2 mb-2 max-w-md" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Radio com Delay</h1>

      </motion.div>
      <RadioPlayerComponent />
      {/* <RadioPlayer /> */}
      {/* <ReactPlayer url='https://liverdgaupoa.rbsdirect.com.br/primary/gaucha_rbs.sdp/playlist.m3u8' /> */}
      {/* <AudioPlayer
        autoPlay
        src="https://liverdgaupoa.rbsdirect.com.br/primary/gaucha_rbs.sdp/playlist.m3u8"
        onPlay={e => console.log("onPlay")}
        // other props here
      /> */}
      {/* explanation div */}
      <motion.div
        className="w-full max-w-xl p-4 sm:p-8 mt-8 sm:mt-16 bg-white rounded-lg shadow-lg space-y-4 sm:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="space-y-2 sm:space-y-3">
          <p className="text-gray-700 text-sm sm:text-base">
            Sincronizar jogos de futebol com a transmissão da TV e ouvir a narração ao vivo
          </p>
        </section>

        <section className="space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-600">Como usar</h2>
          <div className="text-gray-700 space-y-2">
            <p className="flex gap-2">
              <span className="flex flex-shrink-0 items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">1</span>
              Clique no botão de pause para pausar a transmissão.
            </p>
            <p className="flex gap-2">
              <span className="flex flex-shrink-0 items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">2</span>
              Ajuste o tempo de delay para o tempo em que o jogo começa.
            </p>
            <p className="flex gap-2">
              <span className="flex flex-shrink-0 items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">3</span>
              Clique no botão de play para continuar a transmissão.
            </p>
          </div>
        </section>

        <section className="space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-600">Dicas</h2>
          <div className="text-gray-700 space-y-2">
            <p className="flex gap-2">
              <span className="flex flex-shrink-0 items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">1</span>
              Identifique um momento marcante do jogo para pausar a transmissão. Por exemplo, um lateral, recuo para o goleiro, etc.
            </p>
            <p className="flex gap-2">
              <span className="flex flex-shrink-0 items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">2</span>
              Espere o mesmo momento ocorrer na TV e clique no botão de play.
            </p>
          </div>
        </section>

        <section className="space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-600">Como funciona</h2>
          <p className="text-gray-700 leading-relaxed">
            Ao clicar no botão de pause, o player irá pausar a transmissão por um tempo determinado pelo usuário.
            Ao clicar no botão de play, o player irá continuar a transmissão a partir do ponto em que foi pausada.
          </p>
        </section>
      </motion.div>

      <div className="flex flex-col items-center gap-2 mt-8">
        <p>Made with ❤️ by <a href="https://github.com/ecomachio" target="_blank" rel="noopener noreferrer" className="text-slate-600">Edian Comachio</a></p>
        <a href="https://github.com/ecomachio/delayedradioapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <GithubIcon className="w-6 h-6 text-slate-600" />
          Github
        </a>
      </div>
    </main>
  )
}

