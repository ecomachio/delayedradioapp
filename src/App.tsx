import { motion } from "framer-motion"
import { RadioPlayer } from "./radio-player"
import { default as RadioPlayerComponent } from "./RadioPlayer"
import ReactPlayer from "react-player"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function App() {
  return (
    <main className="flex w-full min-h-screen mt-32 flex-col items-center justify-center p-24 relative overflow-hidden">
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
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Gaucha Radio com Delay
      </motion.h1>
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
        className="w-full max-w-xl p-8 mt-16 bg-white rounded-lg shadow-lg space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="space-y-3">
          <p className="text-gray-700">
            Sincronizar jogos de futebol com a transmissão da TV e ouvir a narração ao vivo
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-600">Como usar</h2>
          <div className="text-gray-700 space-y-2">
            <p className="flex gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">1</span>
              Clique no botão de pause para pausar a transmissão.
            </p>
            <p className="flex gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">2</span>
              Ajuste o tempo de delay para o tempo em que o jogo começa.
            </p>
            <p className="flex gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">3</span>
              Clique no botão de play para continuar a transmissão.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-600">Dicas</h2>
          <div className="text-gray-700 space-y-2">
            <p className="flex gap-2">
              <span className="flex flex-shrink-0 items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">1</span>
              Identifique um momento marcante do jogo para pausar a transmissão. Por exemplo, um lateral, recuo para o goleiro, etc.
            </p>
            <p className="flex gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-slate-600 font-semibold">2</span>
              Espere o mesmo momento ocorrer na TV e clique no botão de play.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-600">Como funciona</h2>
          <p className="text-gray-700 leading-relaxed">
            Ao clicar no botão de pause, o player irá pausar a transmissão por um tempo determinado pelo usuário.
            Ao clicar no botão de play, o player irá continuar a transmissão a partir do ponto em que foi pausada.
          </p>
        </section>
      </motion.div>

    </main>
  )
}

