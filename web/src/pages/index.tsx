import Image from "next/image";

import AppPreviewImg from "../assets/app-preview.png";
import LogoImg from "../assets/logo.svg";
import AvataresImg from "../assets/avatares.png";
import IconChecking from "../assets/icon.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCountReponse: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });
      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso, o código foi copiado para área de transferência"
      );
    } catch (err) {
      alert("Falha ao criar o bolão!! Tente novamente!");
    }
    setPoolTitle("");
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto flex flex-col justify-center p-3  md:p-0 md:grid md:grid-cols-2 items-center gap-28 md:mt-8 ">
      <main>
        <Image src={LogoImg} alt="NLW Copa" />
        <h1 className="mt-14 text-white font-bold text-2xl md:text-5xl leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2 ">
          <Image src={AvataresImg} alt="Avatares example" />
          <strong className="text-[#E1E1E6] text-lg md:text-xl">
            <span className="text-[#129E57]">+{props.userCountReponse} </span>
            pessoas já estão usando
          </strong>
        </div>
        <form
          onSubmit={createPool}
          className="mt-10 flex flex-col md:flex-row gap-2"
        >
          <input
            type="text"
            className="flex-1 px-4  md:px-6 py-4 rounded bg-[#202024] border border-[#323238] text-sm text-[#C4C4CC]"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={(e) => setPoolTitle(e.target.value)}
          />
          <button
            className="bg-[#F7DD43] px-6 py-4 rounded font-bold text-[#202024] hover:opacity-90 transition-colors"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>
        <p className="mt-4 text-sm text-[#8D8D99] leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-[#323238]  flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={IconChecking} alt="Icon checking" />
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl">
                +{props.poolCount}
              </span>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className="flex items-center gap-6 md:border-l md:border-[#323238] pl-20">
            <Image src={IconChecking} alt="Icon checking" />
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl">
                +{props.guessesCount}
              </span>
              <span>palpites enviados </span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={AppPreviewImg}
        alt="Dois celulares"
        quality={100}
        className="hidden md:block"
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountReponse] =
    await Promise.all([
      api.get("/pools/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessCountResponse.data.count,
      userCount: userCountReponse.data.count,
    },
  };
};
