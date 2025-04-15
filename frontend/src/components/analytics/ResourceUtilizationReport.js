import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  useTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import { 
  DatePicker,
  LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import {
  FileDownload as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';
import ClassService from '../../services/ClassService';
import RoomService from '../../services/RoomService';
import SubjectService from '../../services/SubjectService';

const ResourceUtilizationReport = ({ schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedResource, setSelectedResource] = useState('rooms');
  const [error, setError] = useState(null);
  const [utilizationData, setUtilizationData] = useState({
    rooms: [],
    classes: [],
    subjects: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz klasy
        const classesResponse = await ClassService.getClassesBySchool(schoolId);
        setClasses(classesResponse);
        
        // Pobierz sale
        const roomsResponse = await RoomService.getRoomsBySchool(schoolId);
        setRooms(roomsResponse);
        
        // Pobierz przedmioty
        const subjectsResponse = await SubjectService.getAllSubjects();
        setSubjects(subjectsResponse);
        
        // Symulacja danych wykorzystania zasobów
        generateUtilizationData(roomsResponse, classesResponse, subjectsResponse);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId]);

  // Generowanie danych wykorzystania zasobów
  const generateUtilizationData = (roomsData, classesData, subjectsData) => {
    // Dane wykorzystania sal
    const roomUtilization = roomsData.map(room => {
      const utilizationRate = Math.floor(Math.random() * 60) + 40; // 40-100%
      const hoursPerWeek = Math.floor(Math.random() * 30) + 10; // 10-40 godzin
      const peakHours = Math.floor(Math.random() * 10) + 5; // 5-15 godzin
      const idleHours = Math.floor(Math.random() * 10); // 0-10 godzin
      
      // Dane wykorzystania według dni tygodnia
      const dailyUtilization = [
        { day: 'Poniedziałek', hours: Math.floor(Math.random() * 6) + 2 },
        { day: 'Wtorek', hours: Math.floor(Math.random() * 6) + 2 },
        { day: 'Środa', hours: Math.floor(Math.random() * 6) + 2 },
        { day: 'Czwartek', hours: Math.floor(Math.random() * 6) + 2 },
        { day: 'Piątek', hours: Math.floor(Math.random() * 6) + 2 }
      ];
      
      // Dane wykorzystania według godzin
      const hourlyUtilization = Array.from({ length: 10 }, (_, i) => ({
        hour: i + 1,
        utilization: Math.floor(Math.random() * 100)
      }));
      
      return {
        id: room.id,
        name: room.name,
        capacity: room.capacity || Math.floor(Math.random() * 20) + 10,
        utilizationRate,
        hoursPerWeek,
        peakHours,
        idleHours,
        dailyUtilization,
        hourlyUtilization,
        specialEquipment: room.hasSpecialEquipment || Math.random() > 0.7
      };
    });
    
    // Dane wykorzystania klas
    const classUtilization = classesData.map(classItem => {
      const hoursPerWeek = Math.floor(Math.random() * 15) + 25; // 25-40 godzin
      const averageDailyHours = hoursPerWeek / 5;
      const maxDailyHours = Math.min(10, Math.floor(averageDailyHours * 1.3));
      
      // Dane wykorzystania według dni tygodnia
      const dailyUtilization = [
        { day: 'Poniedziałek', hours: Math.floor(Math.random() * 3) + 5 },
        { day: 'Wtorek', hours: Math.floor(Math.random() * 3) + 5 },
        { day: 'Środa', hours: Math.floor(Math.random() * 3) + 5 },
        { day: 'Czwartek', hours: Math.floor(Math.random() * 3) + 5 },
        { day: 'Piątek', hours: Math.floor(Math.random() * 3) + 5 }
      ];
      
      // Dane wykorzystania według przedmiotów
      const subjectDistribution = subjectsData.slice(0, 8).map(subject => ({
        subject: subject.name,
        hours: Math.floor(Math.random() * 5) + 1
      }));
      
      return {
        id: classItem.id,
        name: classItem.name,
        hoursPerWeek,
        averageDailyHours: averageDailyHours.toFixed(1),
        maxDailyHours,
        dailyUtilization,
        subjectDistribution,
        roomChanges: Math.floor(Math.random() * 10) + 5 // 5-15 zmian sal tygodniowo
      };
    });
    
    // Dane wykorzystania przedmiotów
    const subjectUtilization = subjectsData.map(subject => {
      const totalHours = Math.floor(Math.random() * 50) + 10; // 10-60 godzin tygodniowo
      const classesCount = Math.floor(Math.random() * 10) + 1; // 1-10 klas
      const teachersCount = Math.floor(Math.random() * 5) + 1; // 1-5 nauczycieli
      
      // Dane wykorzystania według klas
      const classDistribution = classesData.slice(0, classesCount).map(classItem => ({
        class: classItem.name,
        hours: Math.floor(Math.random() * 5) + 1
      }));
      
      return {
        id: subject.id,
        name: subject.name,
        totalHours,
        classesCount,
        teachersCount,
        averageHoursPerClass: (totalHours / classesCount).toFixed(1),
        classDistribution,
        specialRoomRequired: Math.random() > 0.7
      };
    });
    
    setUtilizationData({
      rooms: roomUtilization,
      classes: classUtilization,
      subjects: subjectUtilization
    });
  };

  // Obsługa zmiany zasobu
  const handleResourceChange = (event) => {
    setSelectedResource(event.target.value);
  };

  // Obsługa zmiany daty początkowej
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Obsługa zmiany daty końcowej
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Generowanie raportu
  const handleGenerateReport = () => {
    setLoading(true);
    
    // Symulacja opóźnienia generowania raportu
    setTimeout(() => {
      // W rzeczywistej aplikacji tutaj byłoby pobieranie danych dla wybranego okresu
      setLoading(false);
    }, 1000);
  };

  // Kolory dla wykresów
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.warning.light
  ];

  // Renderowanie zawartości raportu w zależności od wybranego zasobu
  const renderResourceReport = () => {
    switch (selectedResource) {
      case 'rooms':
        return renderRoomUtilizationReport();
      case 'classes':
        return renderClassUtilizationReport();
      case 'subjects':
        return renderSubjectUtilizationReport();
      default:
        return null;
    }
  };

  // Raport wykorzystania sal
  const renderRoomUtilizationReport = () => {
    // Top 5 najbardziej wykorzystywanych sal
    const topRooms = [...utilizationData.rooms]
      .sort((a, b) => b.utilizationRate - a.utilizationRate)
      .slice(0, 5);
    
    // Top 5 najmniej wykorzystywanych sal
    const bottomRooms = [...utilizationData.rooms]
      .sort((a, b) => a.utilizationRate - b.utilizationRate)
      .slice(0, 5);
    
    // Dane do wykresu wykorzystania sal według pojemności
    const roomsByCapacity = utilizationData.rooms.map(room => ({
      x: room.capacity,
      y: room.utilizationRate,
      z: room.hoursPerWeek,
      name: room.name
    }));
    
    // Dane do wykresu wykorzystania sal według dni tygodnia
    const roomDailyData = [
      { name: 'Poniedziałek', value: utilizationData.rooms.reduce((sum, room) => sum + room.dailyUtilization[0].hours, 0) },
      { name: 'Wtorek', value: utilizationData.rooms.reduce((sum, room) => sum + room.dailyUtilization[1].hours, 0) },
      { name: 'Środa', value: utilizationData.rooms.reduce((sum, room) => sum + room.dailyUtilization[2].hours, 0) },
      { name: 'Czwartek', value: utilizationData.rooms.reduce((sum, room) => sum + room.dailyUtilization[3].hours, 0) },
      { name: 'Piątek', value: utilizationData.rooms.reduce((sum, room) => sum + room.dailyUtilization[4].hours, 0) }
    ];
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Najbardziej wykorzystywane sale" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topRooms}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="utilizationRate" name="Stopień wykorzystania (%)" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Najmniej wykorzystywane sale" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bottomRooms}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="utilizationRate" name="Stopień wykorzystania (%)" fill={theme.palette.error.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Wykorzystanie sal według pojemności" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="Pojemność" unit=" osób" />
                    <YAxis type="number" dataKey="y" name="Wykorzystanie" unit="%" />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Godziny tygodniowo" />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                            <p>{`${payload[0].payload.name}`}</p>
                            <p>{`Pojemność: ${payload[0].value} osób`}</p>
                            <p>{`Wykorzystanie: ${payload[1].value}%`}</p>
                            <p>{`Godziny tygodniowo: ${payload[2].value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend />
                    <Scatter name="Sale" data={roomsByCapacity} fill={theme.palette.primary.main} />
                  </ScatterChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Wykorzystanie sal według dni tygodnia" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomDailyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roomDailyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Podsumowanie wykorzystania sal" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnie wykorzystanie sal:
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {Math.round(utilizationData.rooms.reduce((sum, room) => sum + room.utilizationRate, 0) / utilizationData.rooms.length)}%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnia liczba godzin tygodniowo:
                  </Typography>
                  <Typography variant="h4" color="secondary">
                    {Math.round(utilizationData.rooms.reduce((sum, room) => sum + room.hoursPerWeek, 0) / utilizationData.rooms.length)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sale ze specjalnym wyposażeniem:
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {utilizationData.rooms.filter(room => room.specialEquipment).length}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Niewykorzystane sale (< 50%):
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {utilizationData.rooms.filter(room => room.utilizationRate < 50).length}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Raport wykorzystania klas
  const renderClassUtilizationReport = () => {
    // Top 5 najbardziej obciążonych klas
    const topClasses = [...utilizationData.classes]
      .sort((a, b) => b.hoursPerWeek - a.hoursPerWeek)
      .slice(0, 5);
    
    // Dane do wykresu obciążenia klas według dni tygodnia
    const classDailyData = [
      { name: 'Poniedziałek', value: utilizationData.classes.reduce((sum, cls) => sum + cls.dailyUtilization[0].hours, 0) },
      { name: 'Wtorek', value: utilizationData.classes.reduce((sum, cls) => sum + cls.dailyUtilization[1].hours, 0) },
      { name: 'Środa', value: utilizationData.classes.reduce((sum, cls) => sum + cls.dailyUtilization[2].hours, 0) },
      { name: 'Czwartek', value: utilizationData.classes.reduce((sum, cls) => sum + cls.dailyUtilization[3].hours, 0) },
      { name: 'Piątek', value: utilizationData.classes.reduce((sum, cls) => sum + cls.dailyUtilization[4].hours, 0) }
    ];
    
    // Dane do wykresu rozkładu przedmiotów
    const subjectDistributionData = subjects.slice(0, 8).map(subject => ({
      name: subject.name,
      value: utilizationData.classes.reduce((sum, cls) => {
        const subjectData = cls.subjectDistribution.find(s => s.subject === subject.name);
        return sum + (subjectData ? subjectData.hours : 0);
      }, 0)
    })).sort((a, b) => b.value - a.value);
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Najbardziej obciążone klasy" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topClasses}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 50]} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="hoursPerWeek" name="Godziny tygodniowo" fill={theme.palette.primary.main} />
                    <Bar dataKey="maxDailyHours" name="Maks. godzin dziennie" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Obciążenie klas według dni tygodnia" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={classDailyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {classDailyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Rozkład przedmiotów" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectDistributionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="value" name="Łączna liczba godzin" fill={theme.palette.success.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Podsumowanie obciążenia klas" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnia liczba godzin tygodniowo:
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {Math.round(utilizationData.classes.reduce((sum, cls) => sum + cls.hoursPerWeek, 0) / utilizationData.classes.length)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnia liczba godzin dziennie:
                  </Typography>
                  <Typography variant="h4" color="secondary">
                    {(utilizationData.classes.reduce((sum, cls) => sum + parseFloat(cls.averageDailyHours), 0) / utilizationData.classes.length).toFixed(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnia liczba zmian sal:
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {Math.round(utilizationData.classes.reduce((sum, cls) => sum + cls.roomChanges, 0) / utilizationData.classes.length)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Klasy z wysokim obciążeniem (>35h):
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {utilizationData.classes.filter(cls => cls.hoursPerWeek > 35).length}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Raport wykorzystania przedmiotów
  const renderSubjectUtilizationReport = () => {
    // Top 5 najbardziej nauczanych przedmiotów
    const topSubjects = [...utilizationData.subjects]
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 5);
    
    // Dane do wykresu rozkładu przedmiotów według liczby klas
    const subjectsByClassCount = [...utilizationData.subjects]
      .sort((a, b) => b.classesCount - a.classesCount)
      .slice(0, 10);
    
    // Dane do wykresu przedmiotów wymagających specjalnych sal
    const specialRoomSubjects = utilizationData.subjects.filter(subject => subject.specialRoomRequired);
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Najbardziej nauczane przedmioty" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topSubjects}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="totalHours" name="Łączna liczba godzin" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Przedmioty według liczby klas" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectsByClassCount}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="classesCount" name="Liczba klas" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Przedmioty wymagające specjalnych sal" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={specialRoomSubjects}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, totalHours }) => `${name}: ${totalHours}h`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="totalHours"
                      nameKey="name"
                    >
                      {specialRoomSubjects.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Średnia liczba godzin na klasę" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={utilizationData.subjects.slice(0, 10)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="averageHoursPerClass" name="Średnia liczba godzin na klasę" fill={theme.palette.success.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Podsumowanie przedmiotów" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Łączna liczba godzin tygodniowo:
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {utilizationData.subjects.reduce((sum, subject) => sum + subject.totalHours, 0)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnia liczba godzin na przedmiot:
                  </Typography>
                  <Typography variant="h4" color="secondary">
                    {Math.round(utilizationData.subjects.reduce((sum, subject) => sum + subject.totalHours, 0) / utilizationData.subjects.length)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Przedmioty wymagające specjalnych sal:
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {utilizationData.subjects.filter(subject => subject.specialRoomRequired).length}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Średnia liczba nauczycieli na przedmiot:
                  </Typography>
                  <Typography variant="h4" color="info.main">
                    {(utilizationData.subjects.reduce((sum, subject) => sum + subject.teachersCount, 0) / utilizationData.subjects.length).toFixed(1)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h5">
          Raport wykorzystania zasobów
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Pobierz raport">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Drukuj raport">
            <IconButton onClick={() => window.print()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Udostępnij raport">
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="resource-select-label">Zasób</InputLabel>
            <Select
              labelId="resource-select-label"
              id="resource-select"
              value={selectedResource}
              label="Zasób"
              onChange={handleResourceChange}
            >
              <MenuItem value="rooms">Sale lekcyjne</MenuItem>
              <MenuItem value="classes">Klasy</MenuItem>
              <MenuItem value="subjects">Przedmioty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <DatePicker
                label="Data początkowa"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="Data końcowa"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateReport}
                startIcon={<FilterIcon />}
              >
                Generuj raport
              </Button>
            </Stack>
          </LocalizationProvider>
        </Grid>
      </Grid>
      
      {renderResourceReport()}
    </Paper>
  );
};

export default ResourceUtilizationReport;
