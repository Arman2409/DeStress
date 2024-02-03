import { useEffect, useRef, useState } from "react";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector2,
  Vector3,
  Raycaster,
} from 'three';

import styles from "../../../../styles/pages/VoidVoyage/VoidVoyage.module.scss";
import Loading from "../../../../globals/components/Loading/Loading";

const VoidVoyageGame = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const threeContainer = useRef<any>();
  const gameInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (gameInitialized.current) return;
    gameInitialized.current = true;
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15; // Adjust camera position
  
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new SphereGeometry(1, 40, 40);
    const material = new MeshBasicMaterial({ color: 0xff0000 }); // Black color
    const blackHole = new Mesh(geometry, material);
    scene.add(blackHole);
    threeContainer.current.appendChild(renderer.domElement);
    const starGeometry = new SphereGeometry(0.1, 10, 10);
    const starMaterial = new MeshBasicMaterial({ color: 0xFFFFFF }); // White color

    setInterval(() => {
      const star = new Mesh(starGeometry, starMaterial);
      star.position.x = Math.random() * 20 - 10;
      star.position.y = Math.random() * 20 - 10;
      star.position.z = Math.random() * 20 - 10;
      scene.add(star);
    }, 100)

    function animate() {
      requestAnimationFrame(animate);

      scene.children.forEach(child => {
        if (child !== blackHole) {
          // Move towards the black hole as before
          const direction = blackHole.position.clone().sub(child.position).normalize();
          child.position.add(direction.multiplyScalar(0.05));
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    function onMouseMove(event:any) {
      const mouseX = (event.clientX / window.innerWidth) * 20 - 10;
      const mouseY = -(event.clientY / window.innerHeight) * 20 + 10;
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(mouseX, mouseY), camera);
    
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        // If the mouse is over an object
        blackHole.position.copy(intersects[0].point);
        blackHole.position.z = -5;

      } else {
        // Otherwise, project mouse position onto the scene's ground plane
        const projectedPoint = new Vector3(mouseX, mouseY, 0);
        blackHole.position.copy(projectedPoint);
        blackHole.position.z = -5;
      }
    }

    window.addEventListener('mousemove', onMouseMove);
  }, [])

  return (
    <>
      {loading && <Loading />}
      <div ref={threeContainer} />
    </>
  )
}

export default VoidVoyageGame;