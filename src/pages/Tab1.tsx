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
  
  // TypeScript type for Event
  interface EventType {
	id: string;
	title: string;
	desc: string;
	image?: string;
	tags?: string[] | string; // can be array or string from Firestore
	timedate?: any;
	cAt?: any;
	cBy?: string;
  }
  
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
	const [allEvents, setAllEvents] = useState<EventType[]>([]);
	const [usersMap, setUsersMap] = useState<{ [key: string]: string }>({});
  
	useEffect(() => {

	  	const fetchEvents = async () => {
			try {
			const querySnapshot = await getDocs(collection(db, "events"));
	
			const eventsData: EventType[] = querySnapshot.docs.map(doc => {
				const data = doc.data() as Omit<EventType, 'id'>; // exclude `id` from doc.data()
				return { id: doc.id, ...data };
			});
	
			// Sort by creation timestamp if exists
			eventsData.sort((a, b) => toMillis(b.timedate) - toMillis(a.timedate));
	
			console.log("Fetched events:", eventsData);
			setAllEvents(eventsData);
	
			} catch (error) {
			console.error("Error fetching events:", error);
			}
		};
		fetchEvents();

	  	const fetchUsers = async () => {
			try {
			const usersSnapshot = await getDocs(collection(db, "users"));
				
			const userData: { [key: string]: string } = {};

				usersSnapshot.forEach(doc => {
				const data = doc.data();
				userData[doc.id] = data.name; // store UID -> name
				});

				setUsersMap(userData);

		
			} catch (error) {
			console.error("Error fetching users:", error);
			}
		};
		fetchUsers();
		}, []);
  
	// Utility to safely parse tags
	const parseTags = (tags?: string[] | string): string[] => {
	  if (!tags) return [];
	  if (Array.isArray(tags)) return tags;
	  try {
		const parsed = JSON.parse(tags);
		if (Array.isArray(parsed)) return parsed;
	  } catch {
		// fallback: treat as single string tag
		return [tags];
	  }
	  return [];
	};

	const toMillis = (ts: any) => {
		if (!ts) return 0;
		if (typeof ts === "number") return ts;
		if (ts?.toMillis) return ts.toMillis();
		if (ts?.seconds) return ts.seconds * 1000;
		const d = new Date(ts);
		return isNaN(d.getTime()) ? 0 : d.getTime();
		};

	const formatDate = (ts: any) => {
		const ms = toMillis(ts);
		return ms ? new Date(ms).toLocaleString() : "";
		};

  
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
  
				{allEvents.map((evt, index) => (
				  <IonCard key={evt.id || index} className="post">
  
					{evt.image && (
					  <img
						src={evt.image}
						alt={evt.title}
						style={{ height: '300px', width: '100%', objectFit: 'cover' }}
					  />
					)}
  
					<IonCardHeader>
					  <IonCardTitle>{evt.title}</IonCardTitle>
					  <IonCardSubtitle>

						<IonCardContent className="events-description">
							{usersMap[evt.cBy || ""] || "Unknown User"}
						</IonCardContent>
  
						{parseTags(evt.tags).map((tag, idx) => (
						  <span key={idx} className={`tag ${getTagColorClass(tag)}`}>
							{tag}
						  </span>
						))}
  
						<br /><br />
  
						{formatDate(evt.timedate)}
  
					  </IonCardSubtitle>
					</IonCardHeader>
  
					<IonCardContent className="events-description">
					  {evt.desc}
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
  