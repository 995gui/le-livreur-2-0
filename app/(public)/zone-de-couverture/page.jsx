'use client';
import { useState, useEffect } from 'react';
import { MapPin, Clock, Search, ArrowRight, Phone, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function ZoneCouverturePage() {
  const [zones, setZones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllQuartiers, setShowAllQuartiers] = useState({});

  const phoneNumber = "01 47 04 28 15";
  const cleanPhone = "2290147042815";

  // Note: Remplacez cette section par votre vrai appel Supabase
  useEffect(() => {
    async function fetchZones() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      
      const { data } = await supabase
        .from('coverage_zones')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true });
      
      setZones(data || []);
      
      setLoading(false);
    }
    
    fetchZones();
  }, []);

  // Logique de filtrage améliorée avec mise en évidence
  const filteredZones = zones.map(zone => {
    const quartiersList = zone.quartiers.split(',').map(q => q.trim());
    const query = searchQuery.toLowerCase();
    
    const matchingQuartiers = quartiersList.filter(q => 
      q.toLowerCase().includes(query)
    );

    const nameMatches = zone.name.toLowerCase().includes(query);
    const descriptionMatches = zone.description.toLowerCase().includes(query);

    return {
      ...zone,
      quartiersList,
      matchingQuartiers,
      nameMatches,
      descriptionMatches,
      matches: matchingQuartiers.length > 0 || nameMatches || descriptionMatches || query === ''
    };
  }).filter(zone => zone.matches);

  const toggleShowAll = (zoneId) => {
    setShowAllQuartiers(prev => ({
      ...prev,
      [zoneId]: !prev[zoneId]
    }));
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark>
        : part
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#F4B223] to-[#E5A520] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Notre Territoire</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Zones de Couverture
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nous couvrons l'intégralité du Grand Nokoué : Cotonou et Abomey-Calavi
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar avec stats */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Rechercher un quartier (ex: Ganhi, PK3, Jonquet...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white focus:outline-none focus:border-[#F4B223] focus:ring-4 focus:ring-[#F4B223]/20 transition text-lg shadow-lg"
            />
          </div>
          
          {searchQuery && (
            <div className="text-center mt-4 text-gray-600">
              <span className="font-medium text-[#F4B223]">{filteredZones.length}</span> zone{filteredZones.length > 1 ? 's' : ''} trouvée{filteredZones.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Zones Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#F4B223] border-t-transparent mb-4"></div>
              <p className="text-gray-600 text-lg">Chargement de la carte...</p>
            </div>
          ) : searchQuery && filteredZones.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Zone non trouvée</h3>
                <p className="text-gray-600 mb-6">
                  Le quartier "<span className="font-semibold">{searchQuery}</span>" n'est pas dans notre liste standard.
                </p>
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center gap-2 bg-[#F4B223] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E5A520] transition shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Contactez-nous
                </a>
              </div>
            </div>
          ) : (
            filteredZones.map((zone) => {
              const isExpanded = selectedZone === zone.id;
              const showAll = showAllQuartiers[zone.id];
              const displayQuartiers = showAll ? zone.quartiersList : zone.quartiersList.slice(0, 5);
              const hasMore = zone.quartiersList.length > 5;

              return (
                <div
                  key={zone.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#F4B223]"
                >
                  {/* Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedZone(isExpanded ? null : zone.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-6 h-6 text-[#F4B223] flex-shrink-0" />
                          <h3 className="text-2xl font-bold text-gray-900">
                            {searchQuery ? highlightText(zone.name, searchQuery) : zone.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 ml-9">
                          {searchQuery ? highlightText(zone.description, searchQuery) : zone.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-start">
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">{zone.delivery_time}</span>
                        </div>
                        <div className="bg-[#F4B223] text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
                          {zone.tarif_start}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Liste Quartiers */}
                  <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden`}>
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-6">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Quartiers desservis
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {displayQuartiers.map((q, idx) => {
                            const isHighlighted = searchQuery && q.toLowerCase().includes(searchQuery.toLowerCase());
                            return (
                              <div
                                key={idx}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                  isHighlighted
                                    ? 'bg-[#F4B223] text-white shadow-md scale-105'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {searchQuery ? highlightText(q, searchQuery) : q}
                              </div>
                            );
                          })}
                        </div>
                        
                        {hasMore && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleShowAll(zone.id);
                            }}
                            className="text-[#F4B223] hover:text-[#E5A520] font-semibold text-sm flex items-center gap-1"
                          >
                            {showAll ? 'Voir moins' : `Voir ${zone.quartiersList.length - 5} quartiers de plus`}
                            <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Zone Footer */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Bonjour, je souhaite commander depuis ${zone.name}`}
                          className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#F4B223] to-[#E5A520] text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageCircle className="w-5 h-5" />
                          Commander dans cette zone
                          <ArrowRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* CTA Final */}
        <div className="mt-16 bg-gradient-to-br from-[#F4B223] to-[#E5A520] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous habitez dans l'une de ces zones ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Commandez dès maintenant et profitez d'une livraison rapide !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-3 bg-white text-[#F4B223] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              {phoneNumber}
            </a>
            <a
              href={`https://wa.me/${cleanPhone}?text=Bonjour, je souhaite passer une commande`}
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}