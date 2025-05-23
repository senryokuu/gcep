import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, school, book, notifications, person } from 'ionicons/icons';
import './App.css';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';
import Login from './Login'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import CreateEvent from './pages/CreateEvent';
import ManageEvents from './pages/ManageEvent';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Tab1 />
          </Route>
          <Route exact path="/campus">
            <Tab2 />
          </Route>
          <Route exact path="/department">
            <Tab3 />
          </Route>
          <Route exact path="/notifications">
            <Tab4 />
          </Route>
          <Route exact path="/profile">
            <Tab5 />
          </Route>
          <Route exact path="/manage_events">
            <ManageEvents />
          </Route>
          <Route exact path="/create_event">
            <CreateEvent />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="campus" href="/campus">
            <IonIcon icon={school} />
            <IonLabel>Campus</IonLabel>
          </IonTabButton>
          <IonTabButton tab="department" href="/department">
            <IonIcon icon={book} />
            <IonLabel>Department</IonLabel>
          </IonTabButton>
          <IonTabButton disabled ></IonTabButton>
          <IonTabButton tab="notifications" href="/notifications">
            <IonIcon icon={notifications} />
            <IonLabel>Notifications</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
      <IonFabButton routerLink="/home">
        <IonIcon icon={home} />
      </IonFabButton>
      </IonFab>
    </IonReactRouter>
  </IonApp>
);

export default App;
