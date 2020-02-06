import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import loginScreen from './src/screen/loginScreen';
import firstScreen from './src/screen/firstScreen';
import registerScreen from './src/screen/registerScreen';
import buttonBar from './src/screen/buttonBar';
import cobaMaps from './src/screen/cobaMaps';
import cobaModal from './src/screen/cobaModal';
import berandaScreen from './src/screen/berandaScreen';
import AkunScreen from './src/screen/AkunScreen';
import PesananScreen from './src/screen/PesananScreen';
import DaftarScreen from './src/screen/DaftarScreen';
import PilihanScreen from './src/screen/PilihanScreen';
import MapScreen from './src/screen/tabGojek/MapScreen';
import ChatScreen from './src/screen/tabGojek/ChatScreen';
import CancelScreen from './src/screen/tabGojek/CancelScreen';
import GojekScreen from './src/screen/tabGojek/GojekScreen';
import addDabe from './src/screen/addDabe';
import RiwayatScreen from './src/screen/RiwayatScreen';
import Food from './src/screen/FoodScreen';
const MainNavigator = createStackNavigator({
  First: {screen: firstScreen},
  Login: {screen: loginScreen},
  Register: {screen: registerScreen},
  buttonBar:{screen: buttonBar},
  Maps:{screen: cobaMaps},
  Modal:{screen: cobaModal},
  Beranda:{screen: berandaScreen},
  Pesanan: {screen: PesananScreen},
  Akun: {screen: AkunScreen},
  Daftar: {screen: DaftarScreen},
  Pilihan: {screen: PilihanScreen},
  Map: {screen: MapScreen},
  Chat: {screen: ChatScreen},
  Cancel: {screen: CancelScreen},
  Gojek: {screen: GojekScreen},
  Dabe: {screen: addDabe},
  Riwayat: {screen: RiwayatScreen},
  Food: {screen: Food},
  },{headerMode: 'none'});
const App = createAppContainer(MainNavigator);

export default App;

