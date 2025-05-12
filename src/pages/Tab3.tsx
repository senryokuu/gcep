import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { events } from '../data/eventsData';

const filteredEvents = events.filter(event => event.filter2 === 'BSCS');

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

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Department Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Department Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              {filteredEvents.map((event, index) => (
                <IonCard key={index} className="post">
                  <img src={event.image} alt={event.title} style={{height: '250px', width: '100%', objectFit: 'cover'}}/>
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

export default Tab3;
