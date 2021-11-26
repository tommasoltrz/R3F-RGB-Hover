import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { extend } from "@react-three/fiber";

const CustomShaderMaterial = shaderMaterial(
  // Uniform
  {
    texture1: new THREE.Texture(),
    resolution: new THREE.Vector4(),
    uvRate1: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  glsl`

uniform vec4 resolution;
varying vec2 vUv;
uniform sampler2D texture1;

const float pi = 3.1415925;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}
  `,
  // Fragment Shader
  glsl`

uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;


void main()	{
	vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	gl_FragColor = texture2D(texture1,newUV);
}
  `
);

extend({ CustomShaderMaterial });
