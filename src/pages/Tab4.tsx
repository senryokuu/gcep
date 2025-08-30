import { IonIcon, IonFab, IonFabButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import './Tabs.css';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src="assets/favicon.png" alt="logo" style={{ width: '40px', height: '40px', marginBottom: '10px', marginLeft: '20px'}} />
            <IonTitle style={{ marginTop:'5px'}}>Notifications</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>



            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" className="home-fab">
						<IonFabButton routerLink="/home" className="home-fab-button">
							<IonIcon icon={home} />
						</IonFabButton>
					</IonFab>
      </IonContent>

    </IonPage>
  );
};

export default Tab4;
