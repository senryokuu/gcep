import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tabs.css';
import { events } from '../data/eventsData';

export const getTagColorClass = (tag: string) => {
  switch (tag) {
    case "Gordon College":
      return "gc-tag";
    case "BSCS":
      return "bscs-tag";
    case "CBA":
      return "cba-tag";
  }
};

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>

              {events.map((event, index) => (
                <IonCard key={index} className="post">
                  <img src={event.image} alt={event.title} style={{height: '200px', width: '100%', objectFit: 'cover'}}/>
                  <IonCardHeader>
                    <IonCardTitle>{event.title}</IonCardTitle>
                    <IonCardSubtitle>{event.filter1 && (<span className={`tag ${getTagColorClass(event.filter1)}`}>{event.filter1}</span>)}
                                      {event.filter2 && (<span className={`tag ${getTagColorClass(event.filter2)}`}>{event.filter2}</span> )}
                                      <br></br><br></br> {event.date}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className="events-description">{event.description}</IonCardContent>
                  <IonButton fill="clear">Sign up</IonButton>
                </IonCard>
              ))}
              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
