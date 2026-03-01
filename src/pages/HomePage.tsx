import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { events, isEventPast } from '../data/events';
import { Calendar, MapPin, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFocusArea, setSelectedFocusArea] = useState<string>('All');
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Extract unique focus areas
  const focusAreas = useMemo(() => {
    const areas = new Set(events.map(e => e.focusArea).filter(Boolean));
    return ['All', ...Array.from(areas).sort()];
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.focusArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.audience.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFocus = selectedFocusArea === 'All' || event.focusArea === selectedFocusArea;

      const isPast = isEventPast(event);
      const matchesPast = showPastEvents ? true : !isPast;

      return matchesSearch && matchesFocus && matchesPast;
    });
  }, [searchQuery, selectedFocusArea, showPastEvents]);

  // Helper for card border color
  const getBorderColor = (focusArea: string) => {
    const area = focusArea.toLowerCase();
    if (area.includes('data') || area.includes('ai')) return 'border-t-[#0f62fe]'; // Blue
    if (area.includes('automation')) return 'border-t-[#8a3ffc]'; // Purple
    if (area.includes('storage')) return 'border-t-[#198038]'; // Dark Green
    if (area.includes('cloud') || area.includes('power')) return 'border-t-[#000000]'; // Black
    if (area.includes('z')) return 'border-t-[#525252]'; // Dark Gray
    return 'border-t-gray-300'; // Default
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#161616] text-white py-20 px-4 md:px-12 border-b border-[#393939]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            IBM Agenda Técnica <span className="font-semibold">2026</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Potencia tu conocimiento y llévalo al siguiente nivel con este catálogo de workshops del equipo técnico de IBM España. 
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-12 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-none leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0f62fe] focus:border-[#0f62fe] sm:text-sm"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Focus Area Tabs/Dropdown */}
            <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
              {focusAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedFocusArea(area)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    selectedFocusArea === area
                      ? "bg-[#0f62fe] text-white"
                      : "bg-[#f4f4f4] text-gray-700 hover:bg-[#e0e0e0]"
                  )}
                >
                  {area === 'All' ? 'Todos' : area}
                </button>
              ))}
            </div>

            {/* Past Events Toggle */}
            <button
              onClick={() => setShowPastEvents(!showPastEvents)}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border border-gray-300 flex items-center gap-2",
                showPastEvents
                  ? "bg-[#0f62fe] text-white border-[#0f62fe]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              <Clock className="w-4 h-4" />
              {showPastEvents ? 'Ocultar pasados' : 'Mostrar pasados'}
            </button>

          </div>
        </div>
      </div>

      {/* Events Grid (Cards) */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const isPast = isEventPast(event);
              const borderColorClass = getBorderColor(event.focusArea);
              
              return (
                <div 
                  key={event.id} 
                  className={cn(
                    "group flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full",
                    "border-t-4", 
                    borderColorClass,
                    isPast ? 'opacity-60 bg-gray-50' : ''
                  )}
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                        {event.focusArea}
                      </span>
                      {isPast && (
                        <span className="bg-gray-200 text-gray-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                          Completado
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-light mb-4 group-hover:text-[#0f62fe] transition-colors line-clamp-3 min-h-[5rem]">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600 mt-auto">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{event.dateString}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{event.city}, {event.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-gray-100">
                    {isPast ? (
                      <div className="px-6 py-4 bg-gray-100 text-gray-400 text-sm font-medium flex items-center justify-between cursor-not-allowed">
                        <span>Registro Cerrado</span>
                      </div>
                    ) : (
                      <Link 
                        to={`/event/${event.id}`}
                        className="px-6 py-4 bg-white text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white transition-colors text-sm font-medium flex items-center justify-between group-hover/btn"
                      >
                        <span>Registrarse</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              <p className="text-lg">No se encontraron eventos que coincidan con tu búsqueda.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedFocusArea('All');}}
                className="mt-4 text-[#0f62fe] hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
