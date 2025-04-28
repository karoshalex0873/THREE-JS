import { Canvas } from "@react-three/fiber";
import Desk from "./Desk";
import { OrbitControls } from "@react-three/drei";

interface SceneProps {
  lightsOn: boolean;
}

const Scene = ({ lightsOn }: SceneProps) => {
  return (
    <Canvas shadows camera={{ position: [3, 3, 5], fov: 80 }}>
      {lightsOn && (
        <>
          <ambientLight intensity={0.1} />
          <directionalLight
            castShadow
            intensity={0.8}
            position={[5, 10, 5]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color="white"
          />
          <spotLight
            castShadow
            intensity={10}
            position={[0, 3, 2]}
            angle={0.8}
            penumbra={0.1}
            distance={10}
            color="white"
          />
        </>
      )}

      <Desk />

      <OrbitControls
        enableZoom={true}
        minDistance={4}
        maxDistance={10}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.5}
        enablePan={true}
      />
    </Canvas>
  );
};

export default Scene;
