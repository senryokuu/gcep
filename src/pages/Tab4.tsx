import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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
      </IonContent>

    </IonPage>
  );
};

export default Tab4;
