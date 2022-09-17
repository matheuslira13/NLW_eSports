import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Header, GameCard, GameCardProps, Background } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteName } from "../../routes/";

const Home = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();
  const goToGamePage = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch("http://192.168.1.3:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Header
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => goToGamePage(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Home;
