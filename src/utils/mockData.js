// Mock data for testing when backend is not available

export const mockDoctors = [
  {
    _id: 'doc1',
    name: 'Dr. Richard James',
    image: 'https://i.postimg.cc/MTzRJqFH/logoo.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. James has a strong commitment to delivering comprehensive medical care.',
    fees: 50,
    address: {
      line1: '17th Cross, Richmond',
      line2: 'Circle, Ring Road, London'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Emily Larson',
    image: 'https://i.postimg.cc/MTzRJqFH/logoo.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Larson specializes in women\'s health.',
    fees: 60,
    address: {
      line1: '27th Cross, Richmond',
      line2: 'Circle, Ring Road, London'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Sarah Patel',
    image: 'https://i.postimg.cc/MTzRJqFH/logoo.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Patel is an expert in skin care.',
    fees: 30,
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Christopher Lee',
    image: 'https://i.postimg.cc/MTzRJqFH/logoo.png',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Lee specializes in children\'s health.',
    fees: 40,
    address: {
      line1: '47th Cross, Richmond',
      line2: 'Circle, Ring Road, London'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Jennifer Garcia',
    image: 'https://i.postimg.cc/MTzRJqFH/logoo.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Garcia is an expert in neurological disorders.',
    fees: 50,
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Ring Road, London'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Ahmed Mohamed',
    image: 'https://i.postimg.cc/MTzRJqFH/logoo.png',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '10 Years',
    about: 'د. أحمد متخصص في الطب العام والرعاية الأولية.',
    fees: 45,
    address: {
      line1: 'شارع النصر',
      line2: 'القاهرة، مصر'
    }
  }
]

export const mockHealthData = {
  heartRate: 72,
  bloodOxygen: 98,
  steps: 8500,
  sleepHours: 7.5,
  stressLevel: 3,
  lastUpdate: new Date().toISOString(),
  alerts: [],
  riskScore: 'low'
}

export const mockAppointments = [
  {
    _id: 'app1',
    doctor: {
      name: 'Dr. Richard James',
      speciality: 'General physician',
      image: 'https://i.postimg.cc/MTzRJqFH/logoo.png'
    },
    date: '2024-12-28',
    time: '10:00',
    status: 'confirmed',
    reason: 'فحص دوري'
  },
  {
    _id: 'app2',
    doctor: {
      name: 'Dr. Emily Larson',
      speciality: 'Gynecologist',
      image: 'https://i.postimg.cc/MTzRJqFH/logoo.png'
    },
    date: '2024-12-30',
    time: '14:30',
    status: 'pending',
    reason: 'استشارة'
  }
]

export const mockPatients = [
  {
    _id: 'patient1',
    name: 'محمد علي',
    age: 35,
    condition: 'سكري',
    riskScore: 'medium',
    lastUpdate: new Date().toISOString(),
    healthData: {
      heartRate: 85,
      bloodOxygen: 97,
      steps: 6500,
      sleepHours: 6.5
    },
    alerts: 1
  },
  {
    _id: 'patient2',
    name: 'فاطمة أحمد',
    age: 28,
    condition: 'ربو',
    riskScore: 'low',
    lastUpdate: new Date().toISOString(),
    healthData: {
      heartRate: 72,
      bloodOxygen: 98,
      steps: 12000,
      sleepHours: 8.0
    },
    alerts: 0
  }
]
