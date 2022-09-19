import {
  Modal,
  View,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { Header } from "../../components";
import { THEME } from "../../theme";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: any;
}

export const DuoMatch = ({ discord, onClose, ...rest }: Props) => {
  const [isCopy, setIsCopy] = useState(false);
  const handleCopyDiscordClipboard = async () => {
    setIsCopy(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert("Discord copiado", "Bacana");
    setIsCopy(false);
  };
  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => onClose(false)}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Header
            title="Let’s play!"
            subtitle="Agora é só começar a jogar!"
            style={{
              alignItems: "center",
              marginTop: 24,
            }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordClipboard}
          >
            <Text style={styles.discord}>
              {isCopy ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
