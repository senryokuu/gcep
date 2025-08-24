import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tabs.css';
import { events } from '../data/eventsData';
import React from 'react';

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

const Tab1: React.FC = () => {
	const [allEvents, setAllEvents] = React.useState(events);

	React.useEffect(() => {
		const storedEvent = localStorage.getItem('newEvent');
		if (storedEvent) {
			const newEvent = JSON.parse(storedEvent);
			setAllEvents([newEvent, ...events]); // Add new event to the top of the list
			localStorage.removeItem('newEvent'); // Cleanly remove the item from storage
		}
	}, []); // Run this effect only once when the component mounts

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src="assets/favicon.png" alt="logo" style={{ width: '40px', height: '40px', marginBottom: '10px', marginLeft: '20px' }} />
						<IonTitle style={{ marginTop: '5px' }}>Home</IonTitle>
					</div>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonGrid>
					<IonRow>
						<IonCol>
							{allEvents.map((event, index) => (
								<IonCard key={index} className="post">
									<img src={event.image} alt={event.title} style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
									<IonCardHeader>
										<IonCardTitle>{event.title}</IonCardTitle>
										<IonCardSubtitle>
											{event.filter1 && (<span className={`tag ${getTagColorClass(event.filter1)}`}>{event.filter1}</span>)}
											{event.filter2 && (<span className={`tag ${getTagColorClass(event.filter2)}`}>{event.filter2}</span>)}
											<br /><br /> {event.time} - {event.date}
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
