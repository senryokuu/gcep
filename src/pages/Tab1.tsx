import {
	IonIcon,
	IonFab,
	IonFabButton,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar
  } from '@ionic/react';
  
  import { home } from 'ionicons/icons';
  import './Tabs.css';
  import React, { useEffect, useState } from 'react';
  import { db } from "../firebaseConfig";
  import { collection, getDocs } from "firebase/firestore";
  
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
  
	const [allEvents, setAllEvents] = useState<any[]>([]);
  
	useEffect(() => {
	  const fetchEvents = async () => {
		try {
		  const querySnapshot = await getDocs(collection(db, "events"));
  
		  const eventsData = querySnapshot.docs.map((document) => {
			return {
			  id: document.id,
			  ...document.data()
			};
		  });
  
		  eventsData.sort((a: any, b: any) =>
			b?.cAt?.toMillis?.() - a?.cAt?.toMillis?.()
		  );
  
		  setAllEvents(eventsData);
  
		} catch (error) {
		  console.error("Error fetching events:", error);
		}
	  };
  
	  fetchEvents();
	}, []);
  
	return (
	  <IonPage>
		<IonHeader>
		  <IonToolbar>
			<div style={{ display: 'flex', alignItems: 'center' }}>
			  <img
				src="assets/favicon.png"
				alt="logo"
				style={{ width: '40px', height: '40px', marginBottom: '10px', marginLeft: '20px' }}
			  />
			  <IonTitle style={{ marginTop: '5px' }}>Home</IonTitle>
			</div>
		  </IonToolbar>
		</IonHeader>
  
		<IonContent fullscreen>
		  <IonGrid>
			<IonRow>
			  <IonCol>
  
				{allEvents.length === 0 && (
				  <p style={{ textAlign: 'center', marginTop: '50px' }}>
					Loading events...
				  </p>
				)}
  
				{allEvents.map((event: any, index: number) => (
				  <IonCard key={event.id || index} className="post">
  
					{event.image && (
					  <img
						src={event.image}
						alt={event.title}
						style={{ height: '300px', width: '100%', objectFit: 'cover' }}
					  />
					)}
  
					<IonCardHeader>
					  <IonCardTitle>{event.title}</IonCardTitle>
					  <IonCardSubtitle>
  
						{event.tags && event.tags.map((tag: string, idx: number) => (
						  <span key={idx} className={`tag ${getTagColorClass(tag)}`}>
							{tag}
						  </span>
						))}
  
						<br /><br />
  
						{event.timedate &&
						  new Date(event.timedate.seconds * 1000).toLocaleString()
						}
  
					  </IonCardSubtitle>
					</IonCardHeader>
  
					<IonCardContent className="events-description">
					  {event.desc}
					</IonCardContent>
  
					<IonButton fill="clear">Sign up</IonButton>
  
				  </IonCard>
				))}
  
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
  
  export default Tab1;
  