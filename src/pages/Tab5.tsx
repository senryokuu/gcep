import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import './Tabs.css';
import { usercreds } from '../data/userCreds';
import { add } from 'ionicons/icons';

const Tab5: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src="assets/favicon.png" alt="logo" style={{ width: '40px', height: '40px', marginBottom: '10px', marginLeft: '20px'}} />
            <IonTitle style={{ marginTop:'5px'}}>
              {usercreds.map((cred, index) => (
              <span key={index}>{cred.username}</span>
              ))}
            </IonTitle>
          </div>
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
                        <IonThumbnail className="pfp">
                          <img src= {cred.pfp} alt="profile picture" style={{borderRadius: '50%'}}/>
                        </IonThumbnail>
                        <div>
                          <IonCardTitle className="profile-name" style={{ marginBottom: '10px' }}>{cred.name}</IonCardTitle>
                          <IonCardSubtitle>{cred.studentid}</IonCardSubtitle>
                        </div>
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <IonItem button routerLink="/manage_events">
                          <IonLabel>Manage Events</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/department">
                          <IonLabel>Profile Settings</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/notifications">
                          <IonLabel>Settings</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/login">
                          <IonLabel>Logout</IonLabel>
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
