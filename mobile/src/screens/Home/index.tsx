import { View, Image, FlatList } from "react-native";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Header, GameCard } from "../../components";
import { GAMES } from "../../utils/games";
const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Header
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar."
      />
      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
};

export default Home;
