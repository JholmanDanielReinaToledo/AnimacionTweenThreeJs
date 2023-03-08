import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

const Model3D = () => {
  const mountRef = useRef(null);
  const stlLoader = new STLLoader();

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);

    scene.add(camera);
    camera.position.z = 10;
    camera.position.x = 10;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshBasicMaterial({ color: 0x0f2c64 });

    const cube = new THREE.Mesh(geometry, material);
    // const material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
    // Crear malla a partir de la geometría y el material
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
    scene.add(cube);
    camera.lookAt(cube.position);

    renderer.render(scene, camera);

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Model3D;
