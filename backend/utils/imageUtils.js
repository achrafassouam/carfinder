const svgColors = {
  Toyota: '#EB0A1E',
  Honda: '#047BC0',
  Ford: '#003478',
  Chevrolet: '#D1B98D',
  Nissan: '#C3002F',
  BMW: '#0066B1',
  'Mercedes-Benz': '#00ADEF',
  Audi: '#BB0A30',
  Volkswagen: '#001E50',
  Hyundai: '#002C5F',
  Kia: '#BB162B',
  Mazda: '#101010',
  Subaru: '#013C74',
  Lexus: '#1A1A1A',
  Volvo: '#003057'
};

const bodySvgs = {
  Sedan: `<svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,25 H85 Q90,25 90,20 V15 Q90,10 85,10 H75 L65,5 H35 L25,10 H15 Q10,10 10,15 V20 Q10,25 15,25 Z" />
  </svg>`,
  SUV: `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,30 H90 Q95,30 95,25 V15 Q95,10 90,10 H80 L70,5 H30 L20,10 H10 Q5,10 5,15 V25 Q5,30 10,30 Z" />
  </svg>`,
  Hatchback: `<svg viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,25 H85 Q90,25 90,20 V10 L80,5 H20 L10,10 V20 Q10,25 15,25 Z" />
  </svg>`,
  Coupe: `<svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,25 H85 Q90,25 90,20 V15 Q90,10 85,10 H70 L60,5 H40 L30,10 H15 Q10,10 10,15 V20 Q10,25 15,25 Z" />
  </svg>`,
  Truck: `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,30 H90 V15 H70 V10 H30 V15 H10 Q5,15 5,20 V25 Q5,30 10,30 Z" />
  </svg>`,
  Van: `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,30 H90 Q95,30 95,25 V10 H10 Q5,10 5,15 V25 Q5,30 10,30 Z" />
  </svg>`,
  Wagon: `<svg viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,25 H90 V10 L80,5 H20 L10,10 V25 Z" />
  </svg>`,
  Convertible: `<svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,25 H85 Q90,25 90,20 V15 H70 L60,10 H40 L30,15 H15 Q10,15 10,20 V20 Q10,25 15,25 Z" />
  </svg>`
};

function generateCarImage(brand, bodyType) {
  const color = svgColors[brand] || '#000000';
  const svg = bodySvgs[bodyType] || bodySvgs['Sedan'];
  
  return svg.replace('<svg', `<svg fill="${color}"`);
}

module.exports = { generateCarImage };
