import { useState, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from "@radix-ui/react-select";
import { Input } from "../components";
import { Check, GameController, ArrowDown } from "phosphor-react";
import { GameProps } from "../App";
import axios from "axios";

interface Props {
  games: GameProps[];
}

export const CreateAdModal = ({ games }: Props) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const dataForm = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${dataForm.game}/ads`, {
        name: dataForm.name,
        yearsPlaying: Number(dataForm.yearsPlaying),
        discord: dataForm.discord,
        weekDays: weekDays.map(Number),
        hourStart: dataForm.hourStart,
        hourEnd: dataForm.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso!");
      console.log("foi");
    } catch (e) {
      console.log(e);
      alert("Falha");
    }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content
        className="fixed bg-[#2A2634] py-8 px-10 text-white w-[480px]
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-black/25"
      >
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root name="game">
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex align-center justify-between">
                <Select.Value placeholder="Selecione o game que deseja jogar" />

                <Select.Icon>
                  <ArrowDown size={16} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Content className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ">
                <Select.Viewport>
                  {games.map((game) => {
                    return (
                      <Select.Item key={game.id} value={game.id}>
                        <Select.ItemText>{game.title}</Select.ItemText>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do jogo?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser 0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekFays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value={"0"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value={"1"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value={"2"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value={"3"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value={"4"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value={"5"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value={"6"}
                  className={`w-8 h-8 rounded   ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  type="time"
                  id="hourStart"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  type="time"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm ">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(e) => {
                if (e === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 rounded bg-zinc-900"
            >
              <Checkbox.Indicator className="flex justify-center items-center ">
                <Check className="w4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              className="bg-zinc-500 px-5 h-12 rounded-md 
                font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold 
                  flex items-center justify-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar seu duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
