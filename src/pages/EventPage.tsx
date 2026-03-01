import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { events, isEventPast } from '../data/events';
import { Calendar, MapPin, Clock, Mail, ArrowLeft, ArrowRight, User, Building, CheckCircle } from 'lucide-react';

export function EventPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!event) {
    return <div className="p-12 text-center">Evento no encontrado</div>;
  }

  const isPast = isEventPast(event);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (event.registrationUrl) {
      window.location.href = event.registrationUrl;
      return;
    }

    // Simulate email sending
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log(`Email sent to ${event.contactEmail} for event ${event.title}`);
    }, 1500);
  };

  return (
    <div className="bg-[#f4f4f4] min-h-[calc(100vh-3rem)] py-12 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-[#0f62fe] hover:underline mb-8 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la agenda
        </Link>

        <div className="bg-white border border-gray-200 shadow-sm p-8 md:p-12">
          <div className="mb-8 border-b border-gray-100 pb-8">
            <span className="text-[#0f62fe] text-sm font-semibold tracking-wider uppercase mb-2 block">
              {event.focusArea}
            </span>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              {event.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Fecha</p>
                  <p>{event.dateString}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Duración</p>
                  <p>{event.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Ubicación</p>
                  <p>{event.city}, {event.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Contacto</p>
                  <p className="break-all">{event.contactEmail.split(/[;,]/).map(e => e.trim()).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {isPast ? (
            <div className="bg-gray-100 p-6 border-l-4 border-gray-400">
              <h3 className="font-bold text-gray-900 mb-2">Evento Finalizado</h3>
              <p className="text-gray-600">El registro para este evento ya no está disponible porque la fecha ha pasado.</p>
            </div>
          ) : isSubmitted ? (
            <div className="bg-green-50 p-6 border-l-4 border-green-500 flex items-start gap-4 animate-in fade-in duration-500">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-800 mb-2">¡Solicitud Enviada!</h3>
                <p className="text-green-700">
                  Hemos enviado una solicitud de registro a <strong>{event.contactEmail.split(/[;,]/)[0].trim()}</strong>.
                  Te contactarán pronto con más detalles.
                </p>
                <Link to="/" className="inline-block mt-4 text-green-800 underline hover:text-green-900">
                  Ver más eventos
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-medium mb-6">Registro al Evento</h2>
              
              {event.registrationUrl ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Este evento gestiona su registro en una plataforma externa.
                  </p>
                  <a 
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 bg-[#0f62fe] text-white hover:bg-[#0353e9] transition-colors w-full md:w-auto font-medium"
                  >
                    Ir a la página de registro externo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required 
                        className="w-full p-3 bg-[#f4f4f4] border-b border-gray-500 focus:border-[#0f62fe] focus:outline-none transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required 
                        className="w-full p-3 bg-[#f4f4f4] border-b border-gray-500 focus:border-[#0f62fe] focus:outline-none transition-colors"
                        placeholder="Tus apellidos"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico Corporativo</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full p-3 bg-[#f4f4f4] border-b border-gray-500 focus:border-[#0f62fe] focus:outline-none transition-colors"
                      placeholder="nombre@empresa.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Empresa</label>
                    <input 
                      type="text" 
                      id="company" 
                      required 
                      className="w-full p-3 bg-[#f4f4f4] border-b border-gray-500 focus:border-[#0f62fe] focus:outline-none transition-colors"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full md:w-auto px-8 py-4 bg-[#0f62fe] text-white hover:bg-[#0353e9] transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                          Procesando...
                        </>
                      ) : (
                        <>
                          Solicitar Registro
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-xs text-gray-500">
                      Al registrarte, se enviará una notificación a {event.contactEmail.split(/[;,]/)[0].trim()}.
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
