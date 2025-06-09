import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import './App.css';

// Modern Cabinet Component matching the uploaded image style
function ModernCabinet({ 
  position, 
  size, 
  upperColor,
  middleColor, 
  lowerColor,
  type = 'full', // 'full', 'base', 'upper'
  doors = 2,
  drawers = 0,
  hasCountertop = false
}) {
  const [width, height, depth] = size;
  
  return (
    <group position={position}>
      {/* Individual Back Panel - positioned just behind this cabinet */}
      <mesh position={[0, 0, -depth/2 - 0.01]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.02, height + 0.1, 0.02]} />
        <meshLambertMaterial color="#e8e8e8" />
      </mesh>

      {type === 'full' && (
        <>
          {/* Upper Cabinet Section */}
          <group position={[0, height * 0.25, 0]}>
            {/* Upper Cabinet Body */}
            <mesh castShadow>
              <boxGeometry args={[width, height * 0.4, depth * 0.7]} />
              <meshLambertMaterial color={upperColor} />
            </mesh>
            
            {/* Upper Cabinet Doors */}
            {Array.from({ length: doors }, (_, i) => {
              const doorWidth = (width - 0.02) / doors;
              const doorX = -width/2 + doorWidth/2 + i * doorWidth + 0.01;
              
              return (
                <group key={i}>
                  <mesh position={[doorX, 0, depth * 0.35 + 0.01]} castShadow>
                    <boxGeometry args={[doorWidth - 0.01, height * 0.38, 0.02]} />
                    <meshLambertMaterial color={upperColor} />
                  </mesh>
                  {/* Sleek Handle - positioned on opening edge */}
                  <mesh position={[doorX + (i < doors/2 ? doorWidth * 0.3 : -doorWidth * 0.3), 0, depth * 0.35 + 0.02]} castShadow>
                    <boxGeometry args={[0.01, height * 0.15, 0.01]} />
                    <meshLambertMaterial color="#8c8c8c" />
                  </mesh>
                </group>
              );
            })}
          </group>

          {/* Middle Section (Countertop/Backsplash area) */}
          <group position={[0, -height * 0.15, 0]}>
            <mesh castShadow>
              <boxGeometry args={[width + 0.05, height * 0.15, depth + 0.05]} />
              <meshLambertMaterial color={middleColor} />
            </mesh>
          </group>

          {/* Lower Cabinet Section */}
          <group position={[0, -height * 0.35, 0]}>
            {/* Lower Cabinet Body */}
            <mesh castShadow>
              <boxGeometry args={[width, height * 0.5, depth]} />
              <meshLambertMaterial color={lowerColor} />
            </mesh>
            
            {/* Lower Cabinet Doors/Drawers */}
            {drawers > 0 ? (
              // Drawer Configuration
              Array.from({ length: drawers }, (_, i) => {
                const drawerHeight = (height * 0.48) / drawers;
                const drawerY = height * 0.24 - drawerHeight/2 - i * drawerHeight;
                
                return (
                  <group key={i}>
                    <mesh position={[0, drawerY, depth/2 + 0.01]} castShadow>
                      <boxGeometry args={[width - 0.02, drawerHeight - 0.01, 0.02]} />
                      <meshLambertMaterial color={lowerColor} />
                    </mesh>
                    {/* Modern Drawer Handle */}
                    <mesh position={[0, drawerY, depth/2 + 0.02]} castShadow>
                      <boxGeometry args={[width * 0.6, 0.01, 0.01]} />
                      <meshLambertMaterial color="#8c8c8c" />
                    </mesh>
                  </group>
                );
              })
            ) : (
              // Door Configuration
              Array.from({ length: doors }, (_, i) => {
                const doorWidth = (width - 0.02) / doors;
                const doorX = -width/2 + doorWidth/2 + i * doorWidth + 0.01;
                
                return (
                  <group key={i}>
                    <mesh position={[doorX, 0, depth/2 + 0.01]} castShadow>
                      <boxGeometry args={[doorWidth - 0.01, height * 0.48, 0.02]} />
                      <meshLambertMaterial color={lowerColor} />
                    </mesh>
                    {/* Sleek Handle - positioned on opening edge */}
                    <mesh position={[doorX + (i < doors/2 ? doorWidth * 0.3 : -doorWidth * 0.3), 0, depth/2 + 0.02]} castShadow>
                      <boxGeometry args={[0.01, height * 0.2, 0.01]} />
                      <meshLambertMaterial color="#8c8c8c" />
                    </mesh>
                  </group>
                );
              })
            )}
            
            {/* Toe Kick */}
            <mesh position={[0, -height * 0.25 - 0.05, depth/2 - 0.05]} castShadow>
              <boxGeometry args={[width, 0.1, 0.1]} />
              <meshLambertMaterial color="#1a1a1a" />
            </mesh>
          </group>
        </>
      )}

      {type === 'base' && (
        <group>
          {/* Base Cabinet Only */}
          <mesh castShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshLambertMaterial color={lowerColor} />
          </mesh>
          
          {/* Doors/Drawers for base cabinet */}
          {drawers > 0 ? (
            Array.from({ length: drawers }, (_, i) => {
              const drawerHeight = (height - 0.1) / drawers;
              const drawerY = height/2 - drawerHeight/2 - i * drawerHeight - 0.05;
              
              return (
                <group key={i}>
                  <mesh position={[0, drawerY, depth/2 + 0.01]} castShadow>
                    <boxGeometry args={[width - 0.02, drawerHeight - 0.01, 0.02]} />
                    <meshLambertMaterial color={lowerColor} />
                  </mesh>
                  <mesh position={[0, drawerY, depth/2 + 0.02]} castShadow>
                    <boxGeometry args={[width * 0.6, 0.01, 0.01]} />
                    <meshLambertMaterial color="#8c8c8c" />
                  </mesh>
                </group>
              );
            })
          ) : (
            Array.from({ length: doors }, (_, i) => {
              const doorWidth = (width - 0.02) / doors;
              const doorX = -width/2 + doorWidth/2 + i * doorWidth + 0.01;
              
              return (
                <group key={i}>
                  <mesh position={[doorX, 0, depth/2 + 0.01]} castShadow>
                    <boxGeometry args={[doorWidth - 0.01, height - 0.1, 0.02]} />
                    <meshLambertMaterial color={lowerColor} />
                  </mesh>
                  <mesh position={[doorX + (i < doors/2 ? doorWidth * 0.3 : -doorWidth * 0.3), 0, depth/2 + 0.02]} castShadow>
                    <boxGeometry args={[0.01, height * 0.4, 0.01]} />
                    <meshLambertMaterial color="#8c8c8c" />
                  </mesh>
                </group>
              );
            })
          )}
          
          {/* Toe Kick */}
          <mesh position={[0, -height/2 - 0.05, depth/2 - 0.05]} castShadow>
            <boxGeometry args={[width, 0.1, 0.1]} />
            <meshLambertMaterial color="#1a1a1a" />
          </mesh>

          {/* Countertop if specified */}
          {hasCountertop && (
            <mesh position={[0, height/2 + 0.05, 0]} castShadow>
              <boxGeometry args={[width + 0.05, 0.1, depth + 0.05]} />
              <meshLambertMaterial color={middleColor} />
            </mesh>
          )}
        </group>
      )}

      {type === 'upper' && (
        <group>
          {/* Upper Cabinet Only */}
          <mesh castShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshLambertMaterial color={upperColor} />
          </mesh>
          
          {/* Upper Cabinet Doors */}
          {Array.from({ length: doors }, (_, i) => {
            const doorWidth = (width - 0.02) / doors;
            const doorX = -width/2 + doorWidth/2 + i * doorWidth + 0.01;
            
            return (
              <group key={i}>
                <mesh position={[doorX, 0, depth/2 + 0.01]} castShadow>
                  <boxGeometry args={[doorWidth - 0.01, height - 0.05, 0.02]} />
                  <meshLambertMaterial color={upperColor} />
                </mesh>
                <mesh position={[doorX + (i < doors/2 ? doorWidth * 0.3 : -doorWidth * 0.3), 0, depth/2 + 0.02]} castShadow>
                  <boxGeometry args={[0.01, height * 0.3, 0.01]} />
                  <meshLambertMaterial color="#8c8c8c" />
                </mesh>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
}

// Modern Kitchen Island
function ModernKitchenIsland({ upperColor, middleColor, lowerColor, size }) {
  const [width, height, depth] = size;
  
  return (
    <group>
      {/* Island Base */}
      <ModernCabinet 
        position={[0, -height/2, 0]}
        size={[width, height, depth]}
        upperColor={upperColor}
        middleColor={middleColor}
        lowerColor={lowerColor}
        type="base"
        doors={4}
        drawers={0}
        hasCountertop={true}
      />
      
      {/* Extended Countertop */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[width + 0.2, 0.12, depth + 0.2]} />
        <meshLambertMaterial color={middleColor} />
      </mesh>
      
      {/* Modern Edge Detail */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[width + 0.22, 0.02, depth + 0.22]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Kitchen Model Component
function KitchenModel({ cabinetColors, currentModel }) {
  const models = {
    galley: <GalleyKitchen cabinetColors={cabinetColors} />,
    lshape: <LShapeKitchen cabinetColors={cabinetColors} />,
    island: <IslandKitchen cabinetColors={cabinetColors} />
  };

  return models[currentModel];
}

// Modern Galley Kitchen Layout - Based on Reference Image
function GalleyKitchen({ cabinetColors }) {
  const { upper, middle, lower, wall } = cabinetColors;
  
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 8]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, -3]} receiveShadow>
        <boxGeometry args={[14, 4, 0.1]} />
        <meshLambertMaterial color={wall} />
      </mesh>

      {/* Main Galley Kitchen Wall - Single Wall Layout */}
      <group position={[0, 0, -2.5]}>
        
        {/* Tall Pantry Cabinet - Left End */}
        <ModernCabinet 
          position={[-6, 0.5, 0]}
          size={[1.2, 4, 0.6]}
          upperColor={upper}
          middleColor={middle}
          lowerColor={lower}
          type="base"
          doors={2}
          hasCountertop={false}
        />

        {/* Upper and Lower Cabinet Set 1 */}
        <group position={[-4.5, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.5, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={0}
          />
        </group>

        {/* Upper and Lower Cabinet Set 2 */}
        <group position={[-2.8, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={2}
          />
        </group>

        {/* Open Shelving Section - Middle */}
        <group position={[-1.3, 0, 0]}>
          {/* Lower Cabinet Only */}
          <ModernCabinet 
            position={[0, -1.2, 0]}
            size={[1, 1.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="base"
            doors={1}
            hasCountertop={true}
          />
          
          {/* Open Shelves Above */}
          <mesh position={[0, 0.8, -0.2]} castShadow>
            <boxGeometry args={[0.9, 0.05, 0.3]} />
            <meshLambertMaterial color={upper} />
          </mesh>
          <mesh position={[0, 1.3, -0.2]} castShadow>
            <boxGeometry args={[0.9, 0.05, 0.3]} />
            <meshLambertMaterial color={upper} />
          </mesh>
          
          {/* Shelf Supports */}
          <mesh position={[-0.4, 1.05, -0.2]} castShadow>
            <boxGeometry args={[0.05, 0.6, 0.3]} />
            <meshLambertMaterial color={upper} />
          </mesh>
          <mesh position={[0.4, 1.05, -0.2]} castShadow>
            <boxGeometry args={[0.05, 0.6, 0.3]} />
            <meshLambertMaterial color={upper} />
          </mesh>
        </group>

        {/* Upper and Lower Cabinet Set 3 - With Appliance Space */}
        <group position={[0.2, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.5, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={3}
          />
        </group>

        {/* Upper and Lower Cabinet Set 4 */}
        <group position={[1.9, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={2}
          />
        </group>

        {/* Upper and Lower Cabinet Set 5 */}
        <group position={[3.3, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.5, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={0}
          />
        </group>

        {/* Upper and Lower Cabinet Set 6 */}
        <group position={[5, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={4}
          />
        </group>

        {/* End Cabinet - Right Side */}
        <group position={[6.2, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={0}
          />
        </group>

        {/* Continuous Countertop */}
        <mesh position={[0, -0.1, 0.05]} castShadow>
          <boxGeometry args={[12, 0.1, 0.7]} />
          <meshLambertMaterial color={middle} />
        </mesh>

        {/* Under Cabinet Lighting */}
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[-5.5 + i * 1.5, 0.4, 0.3]} castShadow>
            <boxGeometry args={[1, 0.02, 0.05]} />
            <meshLambertMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </mesh>
        ))}
      </group>

      {/* Kitchen Island - Optional Center Island */}
      <ModernKitchenIsland 
        upperColor={upper}
        middleColor={middle}
        lowerColor={lower}
        size={[3, 1.8, 1.5]}
      />

      {/* Appliances - Integrated Look */}
      <group position={[0.2, -0.8, -1.8]}>
        {/* Built-in Microwave */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.4, 0.4]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      <group position={[-4.5, -1.5, -1.8]}>
        {/* Dishwasher */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.8, 0.6]} />
          <meshLambertMaterial color="#4a4a4a" />
        </mesh>
      </group>
    </group>
  );
}

// Modern L-Shape Kitchen Layout - Based on New Reference Image
function LShapeKitchen({ cabinetColors }) {
  const { upper, middle, lower, wall } = cabinetColors;
  
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 10]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, -4]} receiveShadow>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshLambertMaterial color={wall} />
      </mesh>

      {/* Side Wall */}
      <mesh position={[-4, 0, 0]} receiveShadow>
        <boxGeometry args={[0.1, 4, 8]} />
        <meshLambertMaterial color={wall} />
      </mesh>

      {/* Main Wall Cabinets - Clean Modern Design */}
      <group position={[0, 0, -3.5]}>
        
        {/* Cabinet Run 1 */}
        <group position={[-3.5, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={0}
          />
        </group>

        {/* Cabinet Run 2 - Range Area */}
        <group position={[-2.1, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={2}
          />
          
          {/* Range/Cooktop */}
          <mesh position={[0, -0.05, 0.35]} castShadow>
            <boxGeometry args={[0.8, 0.05, 0.5]} />
            <meshLambertMaterial color="#2c2c2c" />
          </mesh>
          
          {/* Range Hood */}
          <mesh position={[0, 0.8, 0.2]} castShadow>
            <boxGeometry args={[1, 0.3, 0.4]} />
            <meshLambertMaterial color="#c0c0c0" />
          </mesh>
        </group>

        {/* Cabinet Run 3 */}
        <group position={[-0.7, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={1}
          />
        </group>

        {/* Cabinet Run 4 */}
        <group position={[0.7, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={0}
          />
        </group>

        {/* Cabinet Run 5 */}
        <group position={[2.1, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={2}
          />
        </group>

        {/* Cabinet Run 6 - End */}
        <group position={[3.5, 0, 0]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={0}
          />
        </group>
      </group>

      {/* Corner Cabinet - Modern Corner Solution */}
      <group position={[-3.2, 0, -2.8]} rotation={[0, Math.PI / 4, 0]}>
        <ModernCabinet 
          position={[0, -0.5, 0]}
          size={[1.4, 2.5, 1.4]}
          upperColor={upper}
          middleColor={middle}
          lowerColor={lower}
          type="full"
          doors={1}
          drawers={0}
        />
      </group>

      {/* Side Wall Cabinets */}
      <group position={[-3.5, 0, 0]}>
        
        {/* Cabinet Run 7 - Corner Area */}
        <group position={[0, 0, -1.8]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={1}
          />
        </group>

        {/* Sink Cabinet */}
        <group position={[0, 0, -0.4]}>
          <ModernCabinet 
            position={[0, -1.2, 0]}
            size={[1.2, 1.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="base"
            doors={2}
            hasCountertop={true}
          />
          
          {/* Upper Cabinet Above Sink */}
          <ModernCabinet 
            position={[0, 1.2, 0]}
            size={[1.2, 1, 0.4]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="upper"
            doors={2}
          />
          
          {/* Sink */}
          <mesh position={[0, -0.05, 0.1]} castShadow>
            <boxGeometry args={[0.6, 0.1, 0.4]} />
            <meshLambertMaterial color="#c0c0c0" />
          </mesh>
          
          {/* Faucet */}
          <mesh position={[0, 0.3, 0.1]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshLambertMaterial color="#c0c0c0" />
          </mesh>
        </group>

        {/* Cabinet Run 8 */}
        <group position={[0, 0, 1]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={3}
          />
        </group>

        {/* Cabinet Run 9 - Built-in Appliances */}
        <group position={[0, 0, 2.4]}>
          <ModernCabinet 
            position={[0, -1.2, 0]}
            size={[1.2, 1.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="base"
            doors={1}
            hasCountertop={true}
          />
          
          {/* Built-in Oven */}
          <mesh position={[0, 0.2, 0.1]} castShadow>
            <boxGeometry args={[0.6, 0.6, 0.5]} />
            <meshLambertMaterial color="#2c2c2c" />
          </mesh>
          
          {/* Built-in Microwave */}
          <mesh position={[0, 0.9, 0.1]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.4]} />
            <meshLambertMaterial color="#2c2c2c" />
          </mesh>
          
          {/* Upper Cabinet */}
          <ModernCabinet 
            position={[0, 1.6, 0]}
            size={[1.2, 0.8, 0.4]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="upper"
            doors={1}
          />
        </group>

        {/* Cabinet Run 10 - End */}
        <group position={[0, 0, 3.8]}>
          <ModernCabinet 
            position={[0, -0.5, 0]}
            size={[1.2, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={1}
            drawers={0}
          />
        </group>
      </group>

      {/* Continuous Countertops */}
      {/* Main Wall Countertop */}
      <mesh position={[0, -0.1, -3.5]} castShadow>
        <boxGeometry args={[8.5, 0.1, 0.7]} />
        <meshLambertMaterial color={middle} />
      </mesh>

      {/* Side Wall Countertop */}
      <mesh position={[-3.5, -0.1, 1]} castShadow>
        <boxGeometry args={[0.7, 0.1, 8]} />
        <meshLambertMaterial color={middle} />
      </mesh>

      {/* Corner Countertop */}
      <mesh position={[-3.2, -0.1, -2.8]} castShadow>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshLambertMaterial color={middle} />
      </mesh>

      {/* Under Cabinet Lighting */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-2.5 + i * 1.4, 0.4, -3.2]} castShadow>
          <boxGeometry args={[1.2, 0.02, 0.05]} />
          <meshLambertMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[-3.2, 0.4, -1.5 + i * 1.4]} castShadow>
          <boxGeometry args={[0.05, 0.02, 1.2]} />
          <meshLambertMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// Modern Island Kitchen Layout
function IslandKitchen({ cabinetColors }) {
  const { upper, middle, lower, wall } = cabinetColors;
  
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 10]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Back Wall Background */}
      <mesh position={[0, 0, -4]} receiveShadow>
        <boxGeometry args={[13, 4, 0.1]} />
        <meshLambertMaterial color={wall} />
      </mesh>

      {/* Side Wall Background */}
      <mesh position={[-5, 0, 2]} receiveShadow>
        <boxGeometry args={[0.1, 4, 2]} />
        <meshLambertMaterial color={wall} />
      </mesh>

      {/* Back Wall Cabinets */}
      <group position={[0, 0, -4]}>
        {Array.from({ length: 6 }, (_, i) => (
          <ModernCabinet 
            key={i}
            position={[-6 + i * 2, -0.5, 0]}
            size={[1.5, 2.5, 0.6]}
            upperColor={upper}
            middleColor={middle}
            lowerColor={lower}
            type="full"
            doors={2}
            drawers={i % 3 === 1 ? 3 : 0}
          />
        ))}
      </group>

      {/* Large Kitchen Island */}
      <ModernKitchenIsland 
        upperColor={upper}
        middleColor={middle}
        lowerColor={lower}
        size={[4.5, 1.8, 2.2]}
      />

      {/* Side Cabinets */}
      <group position={[-5, 0, 2]}>
        <ModernCabinet 
          position={[0, -0.5, 0]}
          size={[1, 2.5, 1.5]}
          upperColor={upper}
          middleColor={middle}
          lowerColor={lower}
          type="full"
          doors={2}
          drawers={2}
        />
      </group>

      {/* Tall Pantry Cabinet */}
      <ModernCabinet 
        position={[5, 0.5, 2]}
        size={[1, 4, 0.6]}
        upperColor={upper}
        middleColor={middle}
        lowerColor={lower}
        type="base"
        doors={2}
        hasCountertop={false}
      />
    </group>
  );
}

// Multi-Section Color Picker Component
function MultiSectionColorPicker({ cabinetColors, onColorChange }) {
  const colors = [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Light Gray', color: '#E5E7EB' },
    { name: 'Charcoal', color: '#374151' },
    { name: 'Black', color: '#1F2937' },
    { name: 'Navy', color: '#1E3A8A' },
    { name: 'Forest Green', color: '#166534' },
    { name: 'Oak', color: '#D2B48C' },
    { name: 'Cherry', color: '#8B4513' },
    { name: 'Walnut', color: '#654321' },
    { name: 'Espresso', color: '#3C2415' },
    { name: 'Cream', color: '#FDF6E3' },
    { name: 'Sage', color: '#9CAF88' }
  ];

  const sections = [
    { key: 'upper', name: 'Upper Cabinets', icon: '⬆️' },
    { key: 'middle', name: 'Countertops', icon: '▬' },
    { key: 'lower', name: 'Lower Cabinets', icon: '⬇️' },
    { key: 'wall', name: 'Wall Color', icon: '🧱' }
  ];

  return (
    <div className="multi-color-picker">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Cabinet Section Colors</h3>
      
      {sections.map(section => (
        <div key={section.key} className="section-picker mb-6">
          <h4 className="text-md font-medium mb-3 text-gray-700 flex items-center gap-2">
            <span>{section.icon}</span>
            {section.name}
            <span className="text-sm text-gray-500">
              ({colors.find(c => c.color === cabinetColors[section.key])?.name})
            </span>
          </h4>
          
          <div className="grid grid-cols-6 gap-2">
            {colors.map((colorOption) => (
              <button
                key={`${section.key}-${colorOption.name}`}
                className={`
                  w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 relative
                  ${cabinetColors[section.key] === colorOption.color 
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
                style={{ backgroundColor: colorOption.color }}
                onClick={() => onColorChange(section.key, colorOption.color)}
                title={`${section.name}: ${colorOption.name}`}
              >
                {cabinetColors[section.key] === colorOption.color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      <div className="preset-combinations mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-md font-medium mb-3 text-gray-700">Popular Combinations</h4>
        <div className="space-y-2">
          <button 
            className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
              onColorChange('upper', '#FFFFFF');
              onColorChange('middle', '#1F2937');
              onColorChange('lower', '#FFFFFF');
              onColorChange('wall', '#E5E7EB');
            }}
          >
            <span className="font-medium">Modern Classic:</span> White + Black + Light Gray Wall
          </button>
          <button 
            className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
              onColorChange('upper', '#D2B48C');
              onColorChange('middle', '#8B4513');
              onColorChange('lower', '#654321');
              onColorChange('wall', '#FDF6E3');
            }}
          >
            <span className="font-medium">Natural Wood:</span> Oak + Cherry + Walnut + Cream Wall
          </button>
          <button 
            className="w-full p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
              onColorChange('upper', '#E5E7EB');
              onColorChange('middle', '#FFFFFF');
              onColorChange('lower', '#9CAF88');
              onColorChange('wall', '#FFFFFF');
            }}
          >
            <span className="font-medium">Soft Modern:</span> Light Gray + White + Sage + White Wall
          </button>
        </div>
      </div>
    </div>
  );
}

// Model Selector Component
function ModelSelector({ currentModel, onModelChange }) {
  const models = [
    { id: 'galley', name: 'Galley Kitchen', description: 'Modern parallel layout with island' },
    { id: 'lshape', name: 'L-Shape Kitchen', description: 'Efficient corner design' },
    { id: 'island', name: 'Island Kitchen', description: 'Open concept with large island' }
  ];

  return (
    <div className="model-selector">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Kitchen Layouts</h3>
      <div className="space-y-3">
        {models.map((model) => (
          <button
            key={model.id}
            className={`
              w-full p-3 rounded-lg transition-all duration-200 text-left
              ${currentModel === model.id
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }
            `}
            onClick={() => onModelChange(model.id)}
          >
            <div className="font-medium">{model.name}</div>
            <div className={`text-sm mt-1 ${currentModel === model.id ? 'text-blue-100' : 'text-gray-500'}`}>
              {model.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [cabinetColors, setCabinetColors] = useState({
    upper: '#FFFFFF',    // White upper cabinets
    middle: '#1F2937',   // Black countertops  
    lower: '#FFFFFF',    // White lower cabinets
    wall: '#E5E7EB'      // Light gray walls
  });
  const [currentModel, setCurrentModel] = useState('galley');

  const handleColorChange = (section, color) => {
    setCabinetColors(prev => ({
      ...prev,
      [section]: color
    }));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Modern 3D Kitchen Designer
        </h1>
        <p className="text-gray-600 mb-6">
          Realistic kitchen models with independent color control for upper, middle, and lower sections
        </p>
      </header>

      {/* Main Content */}
      <div className="app-content">
        {/* 3D Viewer */}
        <div className="viewer-container">
          <Canvas
            shadows
            camera={{ position: [8, 5, 8], fov: 60 }}
            className="kitchen-canvas"
          >
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <KitchenModel cabinetColors={cabinetColors} currentModel={currentModel} />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2.2}
              minDistance={3}
              maxDistance={25}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
            <Environment preset="apartment" />
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          <ModelSelector 
            currentModel={currentModel} 
            onModelChange={setCurrentModel} 
          />
          <MultiSectionColorPicker 
            cabinetColors={cabinetColors} 
            onColorChange={handleColorChange} 
          />
          
          {/* Instructions */}
          <div className="instructions">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Features</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Separate color control for 3 sections</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Modern sleek cabinet designs</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Realistic proportions & hardware</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Popular color combination presets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;