import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xC3C4FF);
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);

    scene.add(camera);
    camera.position.z = 10;
    camera.position.x = 10;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({ color: 0x0f2c64 });

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.lookAt(cube.position);
    
    const ambientalLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientalLight);

    const light = new THREE.PointLight(0xff0000, 10);
    light.position.set(8, 8, 8);
    scene.add(light);

    const clock = new THREE.Clock();

    const anuimate = () => {
      const elapsedTime = clock.getElapsedTime();
      cube.rotation.y = elapsedTime;
      cube.rotation.x = elapsedTime;
      cube.position.y = Math.sin(elapsedTime);

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(anuimate);

    }
    anuimate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Model3D;
