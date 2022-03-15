uniform float u_time;

varying vec2 vUv;

void main( void ) {
    float time = u_time;
    vec2 pos = vUv;
    float amount = 1./10.;
    float thickness = sin(pos.y / 50.) + 0.025;

    vec3 color = vec3(0.7, 0.4, 0.75);
    if (mod((pos.y + (sin(time / 10. + pos.x * 5. - asin(pos.y) * 2.)* cos(time / 3.2))* sin(pos.x * 3. + pos.y * 5.)), amount) <= thickness)
    {
        color = vec3(0.0, 0.05, 0.25);
    }

    gl_FragColor = vec4( color, 1.0);
}

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
