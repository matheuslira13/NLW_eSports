import { View, TouchableOpacity, Text } from "react-native";
import { GameController } from "phosphor-react-native";
import { styles } from "./styles";
import { DuoInfo } from "../";
import { THEME } from "../../theme";
import { Dispatch, SetStateAction } from "react";

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConect: () => void;
  get: Dispatch<SetStateAction<boolean>>;
}

export const DuoCard = ({ data, onConect, get }: Props) => {
  const monstro = () => {
    get(true);
    onConect();
  };
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de Jogo" value={`${data.name} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "sim" : "nao"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />
      <TouchableOpacity style={styles.button} onPress={monstro}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
};
