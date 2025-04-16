import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Divider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  IconButton, 
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { 
  PictureAsPdf, 
  TableChart, 
  CalendarToday, 
  Download, 
  FileCopy, 
  Print, 
  Share, 
  MoreVert,
  Close
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent eksportu danych
 * Umożliwia eksport planu lekcji i innych danych do różnych formatów
 */
const DataExportTool = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportScope, setExportScope] = useState('current');
  const [exportTarget, setExportTarget] = useState('class');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [includeOptions, setIncludeOptions] = useState({
    roomInfo: true,
    teacherContacts: false,
    statistics: false,
    notes: true
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportedFilePath, setExportedFilePath] = useState('');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  
  // Symulacja klas i nauczycieli
  const classes = [
    { id: '1a', name: 'Klasa 1A' },
    { id: '1b', name: 'Klasa 1B' },
    { id: '2a', name: 'Klasa 2A' },
    { id: '2b', name: 'Klasa 2B' },
    { id: '3a', name: 'Klasa 3A' },
    { id: '3b', name: 'Klasa 3B' }
  ];
  
  const teachers = [
    { id: 't1', name: 'Jan Kowalski' },
    { id: 't2', name: 'Anna Nowak' },
    { id: 't3', name: 'Piotr Wiśniewski' },
    { id: 't4', name: 'Maria Dąbrowska' },
    { id: 't5', name: 'Tomasz Lewandowski' }
  ];
  
  // Obsługa zmiany formatu eksportu
  const handleFormatChange = (event) => {
    setExportFormat(event.target.value);
  };
  
  // Obsługa zmiany zakresu eksportu
  const handleScopeChange = (event) => {
    setExportScope(event.target.value);
  };
  
  // Obsługa zmiany celu eksportu
  const handleTargetChange = (event) => {
    setExportTarget(event.target.value);
    // Resetowanie wybranych wartości
    setSelectedClass('');
    setSelectedTeacher('');
  };
  
  // Obsługa zmiany wybranej klasy
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };
  
  // Obsługa zmiany wybranego nauczyciela
  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  
  // Obsługa zmiany daty początkowej
  const handleStartDateChange = (event) => {
    setDateRange({
      ...dateRange,
      startDate: event.target.value
    });
  };
  
  // Obsługa zmiany daty końcowej
  const handleEndDateChange = (event) => {
    setDateRange({
      ...dateRange,
      endDate: event.target.value
    });
  };
  
  // Obsługa zmiany opcji dołączania
  const handleIncludeOptionChange = (option) => {
    setIncludeOptions({
      ...includeOptions,
      [option]: !includeOptions[option]
    });
  };
  
  // Symulacja eksportu danych
  const handleExport = () => {
    setIsExporting(true);
    
    // Symulacja opóźnienia eksportu
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      
      // Generowanie nazwy pliku na podstawie wybranych opcji
      const fileName = generateFileName();
      setExportedFilePath(`/exports/${fileName}`);
    }, 2000);
  };
  
  // Generowanie nazwy pliku na podstawie wybranych opcji
  const generateFileName = () => {
    const target = exportTarget === 'class' 
      ? `klasa_${selectedClass}` 
      : `nauczyciel_${selectedTeacher}`;
    
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    return `plan_${target}_${date}.${exportFormat}`;
  };
  
  // Obsługa otwarcia podglądu
  const handleOpenPreview = () => {
    setPreviewDialogOpen(true);
  };
  
  // Obsługa zamknięcia podglądu
  const handleClosePreview = () => {
    setPreviewDialogOpen(false);
  };
  
  // Symulacja pobrania pliku
  const handleDownload = () => {
    console.log(`Pobieranie pliku: ${exportedFilePath}`);
    // W rzeczywistej aplikacji tutaj byłoby przekierowanie do pliku
  };
  
  // Symulacja drukowania
  const handlePrint = () => {
    console.log('Drukowanie planu');
    // W rzeczywistej aplikacji tutaj byłoby wywołanie funkcji drukowania
  };
  
  // Symulacja kopiowania linku
  const handleCopyLink = () => {
    console.log(`Kopiowanie linku do pliku: ${exportedFilePath}`);
    // W rzeczywistej aplikacji tutaj byłoby kopiowanie linku do schowka
  };
  
  // Symulacja udostępniania
  const handleShare = () => {
    console.log('Udostępnianie planu');
    // W rzeczywistej aplikacji tutaj byłoby wywołanie API udostępniania
  };
  
  // Renderowanie ikony formatu
  const renderFormatIcon = () => {
    switch (exportFormat) {
      case 'pdf':
        return <PictureAsPdf />;
      case 'xlsx':
        return <TableChart />;
      case 'ical':
        return <CalendarToday />;
      default:
        return <Download />;
    }
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Download sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Eksport danych</Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="hologram-card" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Konfiguracja eksportu
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="export-format-label">Format eksportu</InputLabel>
                    <Select
                      labelId="export-format-label"
                      value={exportFormat}
                      label="Format eksportu"
                      onChange={handleFormatChange}
                    >
                      <MenuItem value="pdf">PDF (Dokument)</MenuItem>
                      <MenuItem value="xlsx">Excel (Arkusz kalkulacyjny)</MenuItem>
                      <MenuItem value="ical">iCalendar (Kalendarz)</MenuItem>
                      <MenuItem value="csv">CSV (Dane tekstowe)</MenuItem>
                      <MenuItem value="json">JSON (Dane strukturalne)</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="export-scope-label">Zakres eksportu</InputLabel>
                    <Select
                      labelId="export-scope-label"
                      value={exportScope}
                      label="Zakres eksportu"
                      onChange={handleScopeChange}
                    >
                      <MenuItem value="current">Bieżący tydzień</MenuItem>
                      <MenuItem value="next">Następny tydzień</MenuItem>
                      <MenuItem value="month">Cały miesiąc</MenuItem>
                      <MenuItem value="semester">Semestr</MenuItem>
                      <MenuItem value="custom">Niestandardowy zakres</MenuItem>
                    </Select>
                  </FormControl>
                  
                  {exportScope === 'custom' && (
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Data początkowa"
                            type="date"
                            value={dateRange.startDate}
                            onChange={handleStartDateChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Data końcowa"
                            type="date"
                            value={dateRange.endDate}
                            onChange={handleEndDateChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="export-target-label">Cel eksportu</InputLabel>
                    <Select
                      labelId="export-target-label"
                      value={exportTarget}
                      label="Cel eksportu"
                      onChange={handleTargetChange}
                    >
                      <MenuItem value="class">Plan klasy</MenuItem>
                      <MenuItem value="teacher">Plan nauczyciela</MenuItem>
                    </Select>
                  </FormControl>
                  
                  {exportTarget === 'class' ? (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="class-select-label">Wybierz klasę</InputLabel>
                      <Select
                        labelId="class-select-label"
                        value={selectedClass}
                        label="Wybierz klasę"
                        onChange={handleClassChange}
                      >
                        {classes.map(cls => (
                          <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="teacher-select-label">Wybierz nauczyciela</InputLabel>
                      <Select
                        labelId="teacher-select-label"
                        value={selectedTeacher}
                        label="Wybierz nauczyciela"
                        onChange={handleTeacherChange}
                      >
                        {teachers.map(teacher => (
                          <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Dołącz dodatkowe informacje:
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <FormControl component="fieldset">
                      <Grid container>
                        <Grid item xs={12}>
                          <Button
                            variant={includeOptions.roomInfo ? "contained" : "outlined"}
                            color={includeOptions.roomInfo ? "primary" : "inherit"}
                            onClick={() => handleIncludeOptionChange('roomInfo')}
                            sx={{ m: 0.5 }}
                            className={includeOptions.roomInfo ? "robot-button" : ""}
                          >
                            Informacje o salach
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant={includeOptions.teacherContacts ? "contained" : "outlined"}
                            color={includeOptions.teacherContacts ? "primary" : "inherit"}
                            onClick={() => handleIncludeOptionChange('teacherContacts')}
                            sx={{ m: 0.5 }}
                            className={includeOptions.teacherContacts ? "robot-button" : ""}
                          >
                            Kontakty do nauczycieli
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant={includeOptions.statistics ? "contained" : "outlined"}
                            color={includeOptions.statistics ? "primary" : "inherit"}
                            onClick={() => handleIncludeOptionChange('statistics')}
                            sx={{ m: 0.5 }}
                            className={includeOptions.statistics ? "robot-button" : ""}
                          >
                            Statystyki i wykresy
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant={includeOptions.notes ? "contained" : "outlined"}
                            color={includeOptions.notes ? "primary" : "inherit"}
                            onClick={() => handleIncludeOptionChange('notes')}
                            sx={{ m: 0.5 }}
                            className={includeOptions.notes ? "robot-button" : ""}
                          >
                            Notatki i uwagi
                          </Button>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ 
                      p: 2, 
                      border: '1px dashed rgba(77, 171, 245, 0.5)', 
                      borderRadius: 2,
                      textAlign: 'center',
                      backgroundColor: 'rgba(77, 171, 245, 0.05)'
                    }}>
                      <Box sx={{ fontSize: 60, color: theme.palette.primary.main }}>
                        {renderFormatIcon()}
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {exportFormat === 'pdf' && 'Dokument PDF z planem lekcji'}
                        {exportFormat === 'xlsx' && 'Arkusz Excel z danymi planu'}
                        {exportFormat === 'ical' && 'Plik kalendarza do synchronizacji'}
                        {exportFormat === 'csv' && 'Dane tekstowe rozdzielane przecinkami'}
                        {exportFormat === 'json' && 'Dane w formacie JSON'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleOpenPreview}
                  sx={{ mr: 2 }}
                  disabled={!selectedClass && !selectedTeacher}
                >
                  Podgląd
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExport}
                  disabled={!selectedClass && !selectedTeacher || isExporting}
                  startIcon={isExporting ? <CircularProgress size={20} /> : <Download />}
                  className="robot-button"
                >
                  {isExporting ? 'Eksportowanie...' : 'Eksportuj'}
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {exportComplete && (
            <Card className="glowing-border" sx={{ mb: 3, borderColor: theme.palette.success.main }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="success.main" sx={{ flexGrow: 1 }}>
                    Eksport zakończony pomyślnie
                  </Typography>
                  <IconButton size="small" onClick={() => setExportComplete(false)}>
                    <Close />
                  </IconButton>
                </Box>
                
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: 'rgba(77, 171, 245, 0.05)', 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {renderFormatIcon()}
                  <Typography variant="body1" sx={{ ml: 2, flexGrow: 1 }}>
                    {exportedFilePath}
                  </Typography>
                  <Box>
                    <Tooltip title="Pobierz">
                      <IconButton onClick={handleDownload} color="primary">
                        <Download />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Drukuj">
                      <IconButton onClick={handlePrint}>
                        <Print />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Kopiuj link">
                      <IconButton onClick={handleCopyLink}>
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Udostępnij">
                      <IconButton onClick={handleShare}>
                        <Share />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ostatnie eksporty
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                {[
                  { name: 'plan_klasa_1a_20250415.pdf', date: '15.04.2025', format: 'pdf' },
                  { name: 'plan_nauczyciel_t2_20250414.xlsx', date: '14.04.2025', format: 'xlsx' },
                  { name: 'plan_klasa_2b_20250410.ical', date: '10.04.2025', format: 'ical' },
                  { name: 'plan_nauczyciel_t5_20250405.pdf', date: '05.04.2025', format: 'pdf' },
                ].map((file, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      p: 1.5, 
                      mb: 1, 
                      borderRadius: 1,
                      backgroundColor: 'rgba(77, 171, 245, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: 'rgba(77, 171, 245, 0.1)',
                      }
                    }}
                  >
                    <Box sx={{ mr: 1.5, color: theme.palette.primary.main }}>
                      {file.format === 'pdf' && <PictureAsPdf />}
                      {file.format === 'xlsx' && <TableChart />}
                      {file.format === 'ical' && <CalendarToday />}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" noWrap>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {file.date}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ mt: 1 }}
              >
                Pokaż wszystkie
              </Button>
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Wskazówki
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" paragraph>
                • Format PDF jest idealny do drukowania i udostępniania planu lekcji.
              </Typography>
              <Typography variant="body2" paragraph>
                • Format iCalendar pozwala na synchronizację z aplikacjami kalendarza.
              </Typography>
              <Typography variant="body2" paragraph>
                • Excel i CSV są przydatne do dalszej analizy danych.
              </Typography>
              <Typography variant="body2" paragraph>
                • Możesz eksportować plany dla wielu klas lub nauczycieli jednocześnie.
              </Typography>
              <Typography variant="body2">
                • Wyeksportowane pliki są dostępne przez 30 dni w sekcji "Ostatnie eksporty".
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Dialog podglądu */}
      <Dialog
        open={previewDialogOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Podgląd eksportu
            </Typography>
            <IconButton onClick={handleClosePreview}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ 
            height: 500, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: 'rgba(77, 171, 245, 0.05)',
            borderRadius: 1,
            p: 2
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }}>
                {renderFormatIcon()}
              </Box>
              <Typography variant="h6">
                Podgląd planu lekcji
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {exportTarget === 'class' && selectedClass && 
                  `Plan lekcji dla klasy ${classes.find(c => c.id === selectedClass)?.name || selectedClass}`
                }
                {exportTarget === 'teacher' && selectedTeacher && 
                  `Plan lekcji dla nauczyciela ${teachers.find(t => t.id === selectedTeacher)?.name || selectedTeacher}`
                }
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                Format: {exportFormat.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                {exportScope === 'current' && 'Zakres: Bieżący tydzień'}
                {exportScope === 'next' && 'Zakres: Następny tydzień'}
                {exportScope === 'month' && 'Zakres: Cały miesiąc'}
                {exportScope === 'semester' && 'Zakres: Semestr'}
                {exportScope === 'custom' && `Zakres: ${dateRange.startDate} - ${dateRange.endDate}`}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Zamknij</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              handleClosePreview();
              handleExport();
            }}
            startIcon={<Download />}
          >
            Eksportuj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataExportTool;
