import { useTexture } from '@react-three/drei'

const Desk = () => {
  const floorTexture = useTexture('https://imgs.search.brave.com/pwrJBF0wYZECBtP_9fFB-EpG3X_DWI_onewDJtdKgUk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzU1LzI1LzU3/LzM2MF9GXzU1MjU1/NzY2X25HY2plNzdP/REkxRVA5OFVYN25P/WjBjaFBWYzVZVVBC/LmpwZw')

  return (
    <group>
      {/* Main Desk Box */}
      <mesh position={[0, 0.5, 1]} castShadow>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      {/* Desk Top */}
      <mesh position={[0, 1.01, 1]} castShadow>
        <boxGeometry args={[2.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Chair */}
      <group position={[0, 0, -0.3]}>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="brown" />
        </mesh>

        {/* Chair Back */}
        <mesh position={[0, 1, -0.35]} castShadow>
          <boxGeometry args={[0.8, 1, 0.1]} />
          <meshStandardMaterial color="brown" />
        </mesh>

        {/* Chair Legs */}
        {[-0.35, 0.35].map((x) => [-0.35, 0.35].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="white" />
          </mesh>
        )))}
      </group>
    </group>
  )
}

export default Desk
