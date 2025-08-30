import { Redirect, Route, useLocation } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/react';
import { home, school, book, notifications, person } from 'ionicons/icons';
import './App.css'

// Import your page components
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';
import Login from './Login';
import Register from './Register';
import CreateEvent from './pages/CreateEvent';
import ManageEvents from './pages/ManageEvent';

const MainApp: React.FC = () => {
  const location = useLocation();
  // Check if the current path is NOT the login or register page
  const showTabs = location.pathname !== '/login' && location.pathname !== '/register';

  return (
	    <IonTabs>
	      <IonRouterOutlet>
	        <Route exact path="/">
	          <Redirect to="/login" />
	        </Route>
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
	        <Route exact path="/home" component={Tab1} />
	        <Route exact path="/campus" component={Tab2} />
	        <Route exact path="/department" component={Tab3} />
	        <Route exact path="/notifications" component={Tab4} />
	        <Route exact path="/profile" component={Tab5} />
	        <Route exact path="/manage_events" component={ManageEvents} />
	        <Route exact path="/create_event" component={CreateEvent} />
	      </IonRouterOutlet>

      {/* Conditionally render the tab bar and the FAB */}
      {showTabs && (
		<IonTabBar slot="bottom">
			<IonTabButton tab="campus" href="/campus">
				<IonIcon icon={school} />
				<IonLabel>Campus</IonLabel>
			</IonTabButton>
			<IonTabButton tab="department" href="/department">
				<IonIcon icon={book} />
				<IonLabel>Department</IonLabel>
			</IonTabButton>
			<IonTabButton disabled></IonTabButton>
			<IonTabButton tab="notifications" href="/notifications">
				<IonIcon icon={notifications} />
				<IonLabel>Notifications</IonLabel>
			</IonTabButton>
			<IonTabButton tab="profile" href="/profile">
				<IonIcon icon={person} />
				<IonLabel>Profile</IonLabel>
			</IonTabButton>
		</IonTabBar>
	)}
    </IonTabs>
  );
};

export default MainApp;
