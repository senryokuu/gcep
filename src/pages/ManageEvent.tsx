import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tabs.css';
import { add } from 'ionicons/icons';
import { events } from '../data/eventsData';

const filteredEvents = events.filter(event => event.filter2 === 'CBA');

export const getTagColorClass = (tag: string) => {
	switch (tag) {
		case "Gordon College":
			return "gc-tag";
		case "BSCS":
			return "bscs-tag";
		case "CBA":
			return "cba-tag";
		default:
			return "";
	}
};

const ManageEvents: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src="assets/favicon.png" alt="nig" style={{ width: '40px', height: '40px', marginBottom: '10px', marginLeft: '20px' }} />
						<IonTitle style={{ marginTop: '5px' }}>Home</IonTitle>
					</div>
				</IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ marginRight: '20px', marginBottom: '20px'}}>
                                    <IonFabButton routerLink="/create_event">
                                                <IonIcon icon={add} />
                                    </IonFabButton>
                        </IonFab>

                <IonGrid>
                    <IonRow>
                        <IonCol>

                            {filteredEvents.map((event, index) => (
                                <IonCard key={index} className="post">
                                    <img src={event.image} alt={event.title} style={{height: '300px', width: '100%', objectFit: 'cover'}}/>
                                    <IonCardHeader>
                                        <IonCardTitle>{event.title}</IonCardTitle>
                                        <IonCardSubtitle>{event.filter1 && (<span className={`tag ${getTagColorClass(event.filter1)}`}>{event.filter1}</span>)}
                                                                            {event.filter2 && (<span className={`tag ${getTagColorClass(event.filter2)}`}>{event.filter2}</span> )}
                                                                            <br></br><br></br> {event.time} - {event.date}
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

export default ManageEvents;
