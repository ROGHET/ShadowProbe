import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingSequence from './components/LoadingSequence/LoadingSequence';
import Navigation from './components/Navigation/Navigation';
import MissionRibbon from './components/MissionRibbon/MissionRibbon';
import Hero from './components/Hero/Hero';
import MissionViewer from './components/MissionViewer/MissionViewer';
import Analytics from './components/Analytics/Analytics';
import IceDetection from './components/IceDetection/IceDetection';
import LunarMap from './components/LunarMap/LunarMap';
import LandingSiteTable from './components/LandingSiteTable/LandingSiteTable';
import RoverPlanner from './components/RoverPlanner/RoverPlanner';
import About from './components/About/About';
import Team from './components/Team/Team';
import CommandCenter from './components/CommandCenter/CommandCenter';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingSequence onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navigation />
          <MissionRibbon />
          <main>
            <Hero />
            <MissionViewer />
            <Analytics />
            <IceDetection />
            <LunarMap />
            <LandingSiteTable />
            <RoverPlanner />
            <About />
            <Team />
          </main>
          <Footer />
          <CommandCenter />
        </>
      )}
    </>
  );
}
