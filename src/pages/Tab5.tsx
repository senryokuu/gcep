import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import './Tabs.css';
import { usercreds } from '../data/userCreds';

const Tab5: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>

              {usercreds.map((cred, index) => (
                  <IonCard key={index} className="profile">
                    <IonCardHeader>
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                        <IonThumbnail style={{ width: '100px', height: '100px', marginRight: '20px'}}>
                          <img src="../resources/backpain.gif" alt="profile picture" style={{borderRadius: '50%px'}}/>
                        </IonThumbnail>
                        <div>
                          <IonCardTitle className="profile-name" style={{ marginBottom: '4px' }}>{cred.name}</IonCardTitle>
                          <IonCardSubtitle>{cred.studentid}</IonCardSubtitle>
                        </div>
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <IonItem button routerLink="/campus">
                          <IonLabel>Manage Events</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/department">
                          <IonLabel>Profile Settings</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/notifications">
                          <IonLabel>Settings</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
              ))}

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default Tab5;
