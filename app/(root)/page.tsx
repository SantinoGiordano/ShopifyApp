import Image from "next/image";
import { Brain, StretchHorizontal, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <>
      <div
        className=" hidden md:block w-full min-h-[500px] items-center justify-center 
        bg-[url('/header.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"
      >
      </div>

      <div className="p-15 flex flex-col items-center justify-center text-center bg-blue-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400 text-white">
        {/* Title and intro text */}
        <h1 className="text-4xl font-bold mt-2">Meditation & Yoga</h1>
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden mt-6 shadow-lg flex items-center justify-center">
          <Image
            draggable="false"
            src="/yogaStretch.jpg"
            alt="Meditation and Yoga"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-lg mt-4 max-w-xl mx-auto">
          Explore our collection of meditation and yoga practices designed to
          help you find balance, peace, and well-being.
        </p>

        {/* 3 responsive boxes */}
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-stretch px-4 py-12">
          <div className="flex-1 bg-white rounded-xl p-8 flex flex-col shadow-[0_0_24px_4px_rgba(59,130,246,0.7)] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="text-blue-700" size={28} />
              <h3 className="text-left text-2xl font-bold text-blue-700">
                Meditation
              </h3>
            </div>
            <p className="text-gray-700 text-justify">
              Meditation helps calm the mind, reduce stress, and improve
              emotional well-being. Regular practice can enhance focus, promote
              relaxation, and support overall mental health.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-8 flex flex-col shadow-[0_0_24px_4px_rgba(168,85,247,0.7)] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <StretchHorizontal className="text-purple-700" size={28} />
              <h3 className="text-left text-2xl font-bold text-purple-700">
                Yoga
              </h3>
            </div>
            <p className="text-gray-700 text-justify">
              Yoga combines movement and breath to increase flexibility, build
              strength, and reduce tension. Practicing regularly supports
              physical health and mental clarity.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-8 flex flex-col shadow-[0_0_24px_4px_rgba(34,200,94,0.7)] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="text-green-700" size={28} />
              <h3 className="text-left text-2xl font-bold text-green-700">
                Wellness
              </h3>
            </div>
            <p className="text-gray-700 text-justify">
              Focusing on wellness means nurturing your body and mind through
              healthy habits. Embracing wellness can boost your energy, improve
              resilience, and help you lead a happier, healthier life.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
