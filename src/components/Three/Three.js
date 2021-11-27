import * as THREE from "three";
import React, {
  useMemo,
  useEffect,
  useRef,
  Suspense,
  useContext,
  useState,
} from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Context } from "../StoreProvider/StoreProvider";
import { CustomShaderMaterial } from "./shaderMaterial";

const Imager = React.memo(({ img, wSize }) => {
  const ref = useRef();
  const [rec, setRec] = useState(img.getBoundingClientRect());
  const texture = useLoader(THREE.TextureLoader, img.src);
  const elHeight = rec.height;
  const elWidth = rec.width;
  useEffect(() => {
    setRec(img.getBoundingClientRect());
    img.style.opacity = 0;
    let imageAspect = elHeight / elWidth;
    let a1;
    let a2;
    if (elHeight / elWidth > imageAspect) {
      a1 = (elWidth / elHeight) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = elHeight / elWidth / imageAspect;
    }

    texture.needsUpdate = true;
    ref.current.resolution.x = wSize.w;
    ref.current.resolution.y = wSize.h;
    ref.current.resolution.z = a1;
    ref.current.resolution.w = a2;
    ref.current.uniforms.texture1.value = texture;
    ref.current.uniforms.texture1.needsUpdate = true;
    ref.current.extensions.derivatives =
      "#extension GL_OES_standard_derivatives : enable";
    ref.current.side = THREE.DoubleSide;
    ref.current.uvRate1 = new THREE.Vector2(1, 1);
  }, [wSize]);

  return (
    <mesh
      position={[
        0 - wSize.w / 2 + rec.left + rec.width / 2,
        wSize.h / 2 - rec.height / 2 - rec.y - window.scrollY,
        0,
      ]}
      scale={[1, 1, 1]}
    >
      <planeBufferGeometry args={[elWidth, elHeight]} attach="geometry" />
      <customShaderMaterial ref={ref} transparent />
    </mesh>
  );
});

function Effect({ mouse, wSize }) {
  const { gl, scene, camera, size } = useThree();

  const [composer] = useMemo(() => {
    const renderPass = new RenderPass(scene, camera);
    const composer = new EffectComposer(gl);
    composer.addPass(renderPass);

    var myEffect = {
      transparent: true,
      uniforms: {
        tDiffuse: { value: null },
        resolution: {
          value: new THREE.Vector2(1, wSize.h / wSize.w),
        },
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uVelo: { value: 0 },
      },
      vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
      fragmentShader: `
            uniform float time;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;
        uniform vec2 uMouse;
        float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=resolution;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }
        void main()  {
            vec2 newUV = vUv;
            float c = circle(vUv, uMouse, 0.0, 0.15);
            float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).x;
            float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;
            float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;

            // float ra = texture2D(tDiffuse, newUV.xy).a;
            // float ga = texture2D(tDiffuse, newUV.xy ).a;
            // float ba = texture2D(tDiffuse, newUV.xy).a;

            // if (ra == 0.0 && ba == 0.0 && ga == 0.0) {
            //     discard;
            // }
            if (r == 0.0 && b == 0.0 && g == 0.0) {
                discard;
            }
 
            vec4 color = vec4(r, g, b, 1.0).rgba;

            gl_FragColor = color;
        }`,
    };

    const customPass = new ShaderPass(myEffect);

    composer.addPass(customPass);

    return [composer];
  }, [wSize]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
  }, [composer, wSize]);

  return useFrame(() => {
    const mouseY = 1 - mouse.y / window.innerHeight;
    const mouseX = mouse.x / window.innerWidth;
    const uMouse = {
      x: mouseX,
      y: mouseY,
    };
    composer.passes[1].uniforms.uMouse.value = uMouse;
    composer.render();
  }, 1);
}

const Three = () => {
  const { mouse, wSize, top } = useContext(Context);
  const ref = useRef();
  const [collection, setCollection] = useState();
  useEffect(() => {
    setCollection(Array.from(document.getElementsByClassName("js-img")));
  }, []);

  return (
    <Canvas
      ref={ref}
      camera={{ position: [0, 0, 500] }}
      orthographic
      dpr={Math.min(window.devicePixelRatio, 2)}
      alpha={true}
      style={{
        position: "fixed",
        height: "100%",
        overflow: "hidden",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        {top !== undefined && collection && (
          <group position={[0, top, 0]}>
            {collection.map((img, i) => (
              <Imager img={img} key={i} wSize={wSize} />
            ))}
            <Effect mouse={mouse} wSize={wSize} />
          </group>
        )}
      </Suspense>
    </Canvas>
  );
};

export default Three;
