import { useState } from "react";

const campaigns = [
  { id: "5035", name: "Medical Perscription" },
  { id: "5036", name: "Campaign 1" },
  { id: "5037", name: "Campaign 2" },
];

const funnels = [
  { id: "20223", name: "Funnel Name 1 - Main" },
  { id: "20224", name: "Funnel 1" },
  { id: "20225", name: "Funnel 2" },
];

const partners = [
  { id: "3908323", name: "Kody Portra" },
  { id: "3909824", name: "Joe Joe" },
  { id: "3909825", name: "Davd" },
];

interface GeneratedLink {
  id: string;
  name: string;
  url: string;
}

export default function LinkGenerator() {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [selectedFunnel, setSelectedFunnel] = useState<typeof funnels[0] | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<typeof partners>([]);

  const [campaignOpen, setCampaignOpen] = useState(false);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

  const [campaignSearch, setCampaignSearch] = useState("");
  const [funnelSearch, setFunnelSearch] = useState("");
  const [partnerSearch, setPartnerSearch] = useState("");

  const [isGenerated, setIsGenerated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCampaigns = campaigns.filter(c =>
    c.name.toLowerCase().includes(campaignSearch.toLowerCase()) ||
    c.id.includes(campaignSearch)
  );

  const filteredFunnels = funnels.filter(f =>
    f.name.toLowerCase().includes(funnelSearch.toLowerCase()) ||
    f.id.includes(funnelSearch)
  );

  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(partnerSearch.toLowerCase()) ||
    p.id.includes(partnerSearch)
  );

  const togglePartner = (partner: typeof partners[0]) => {
    setSelectedPartners(prev =>
      prev.find(p => p.id === partner.id)
        ? prev.filter(p => p.id !== partner.id)
        : [...prev, partner]
    );
  };

  const selectAllPartners = () => {
    if (selectedPartners.length === partners.length) {
      setSelectedPartners([]);
    } else {
      setSelectedPartners([...partners]);
    }
  };

  const clearCampaign = () => {
    setSelectedCampaign(null);
    setSelectedFunnel(null);
    setSelectedPartners([]);
    setCampaignOpen(false);
  };

  const clearFunnel = () => {
    setSelectedFunnel(null);
    setFunnelOpen(false);
  };

  const removePartner = (partner: typeof partners[0]) => {
    setSelectedPartners(prev => prev.filter(p => p.id !== partner.id));
  };

  const handleGenerate = () => {
    if (selectedCampaign && selectedFunnel && selectedPartners.length > 0) {
      const links = selectedPartners.map(partner => ({
        id: partner.id,
        name: partner.name,
        url: "wefjwenfinuwefiwneiwnefi.cafwefw",
      }));
      setGeneratedLinks(links);
      setIsGenerated(true);
      setIsEditing(false);
    }
  };

  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen p-8 font-sans flex justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-sm text-black mb-8">Tracking Link Generator</h1>

        {/* Main input box - always visible */}
        <div className="border border-gray-200 rounded-lg p-4 mb-8">
          {/* Summary header - shown when generated AND has selections */}
          {isGenerated && (selectedCampaign || selectedFunnel || selectedPartners.length > 0) && (
            <div
              className="cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign && (
                    <span className="px-3 py-1.5 bg-gray-100 rounded text-xs text-black">
                      {selectedCampaign.name}
                    </span>
                  )}
                  {selectedFunnel && (
                    <span className="px-3 py-1.5 bg-gray-100 rounded text-xs text-black">
                      {selectedFunnel.name}
                    </span>
                  )}
                  {selectedPartners.map(partner => (
                    <span key={partner.id} className="px-3 py-1.5 bg-gray-100 rounded text-xs text-black">
                      {partner.id} {partner.name}
                    </span>
                  ))}
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform ${isEditing ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          {/* Expanded form view - shown when not generated, editing, or no selections */}
          {(!isGenerated || isEditing || (!selectedCampaign && !selectedFunnel && selectedPartners.length === 0)) && (
            <div className={isGenerated && (selectedCampaign || selectedFunnel || selectedPartners.length > 0) ? "mt-4 pt-4 border-t border-gray-100" : ""}>
              {/* Campaign Select */}
              <div className="mb-6">
                <label className="text-xs text-black block mb-2">Select a Campaign</label>
                {selectedCampaign ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded text-xs text-black">
                      {selectedCampaign.id} - {selectedCampaign.name}
                      <button onClick={clearCampaign} className="text-gray-500 hover:text-black">×</button>
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      value={campaignSearch}
                      onChange={(e) => setCampaignSearch(e.target.value)}
                      onFocus={() => setCampaignOpen(true)}
                      className="w-full px-4 py-2 bg-gray-100 rounded text-xs placeholder-gray-400 outline-none"
                    />
                    {campaignOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                        {filteredCampaigns.map((campaign) => (
                          <button
                            key={campaign.id}
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setCampaignOpen(false);
                              setCampaignSearch("");
                            }}
                            className="w-full text-left px-4 py-3 text-xs text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            {campaign.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Funnel Select */}
              <div className="mb-6">
                <label className="text-xs text-black block mb-2">Select a Funnel</label>
                {selectedFunnel ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded text-xs text-black">
                      {selectedFunnel.id} - {selectedFunnel.name}
                      <button onClick={clearFunnel} className="text-gray-500 hover:text-black">×</button>
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={selectedCampaign ? "Search" : "Please select a campaign first"}
                      value={funnelSearch}
                      onChange={(e) => setFunnelSearch(e.target.value)}
                      onFocus={() => selectedCampaign && setFunnelOpen(true)}
                      disabled={!selectedCampaign}
                      className={`w-full px-4 py-2 bg-gray-100 rounded text-xs outline-none ${
                        selectedCampaign ? "text-black placeholder-gray-400" : "text-gray-400 placeholder-gray-400"
                      }`}
                    />
                    {funnelOpen && selectedCampaign && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                        {filteredFunnels.map((funnel) => (
                          <button
                            key={funnel.id}
                            onClick={() => {
                              setSelectedFunnel(funnel);
                              setFunnelOpen(false);
                              setFunnelSearch("");
                            }}
                            className="w-full text-left px-4 py-3 text-xs text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            {funnel.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Partners Select */}
              <div className="mb-6">
                <label className="text-xs text-black block mb-2">Select Partners</label>
                {selectedPartners.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {selectedPartners.map((partner) => (
                      <span key={partner.id} className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded text-xs text-black">
                        {partner.id} {partner.name}
                        <button onClick={() => removePartner(partner)} className="text-gray-500 hover:text-black">×</button>
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={selectedCampaign ? "Search" : "Please select a campaign first"}
                    value={partnerSearch}
                    onChange={(e) => setPartnerSearch(e.target.value)}
                    onFocus={() => selectedCampaign && setPartnersOpen(true)}
                    disabled={!selectedCampaign}
                    className={`w-full px-4 py-2 bg-gray-100 rounded text-xs outline-none ${
                      selectedCampaign ? "text-black placeholder-gray-400" : "text-gray-400 placeholder-gray-400"
                    }`}
                  />
                  {partnersOpen && selectedCampaign && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                      <button
                        onClick={selectAllPartners}
                        className="w-full text-left px-4 py-3 text-xs text-black hover:bg-gray-50 border-b border-gray-100 flex items-center gap-3"
                      >
                        <span className={`w-4 h-4 border rounded flex items-center justify-center ${
                          selectedPartners.length === partners.length ? "bg-gray-300 border-gray-300" : "border-gray-300"
                        }`}>
                          {selectedPartners.length === partners.length && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        Select all Partners
                      </button>
                      {filteredPartners.map((partner) => {
                        const isSelected = selectedPartners.find(p => p.id === partner.id);
                        return (
                          <button
                            key={partner.id}
                            onClick={() => togglePartner(partner)}
                            className="w-full text-left px-4 py-3 text-xs text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                          >
                            <span className={`w-4 h-4 border rounded flex items-center justify-center ${
                              isSelected ? "bg-gray-300 border-gray-300" : "border-gray-300"
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </span>
                            {partner.id} {partner.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!selectedCampaign || !selectedFunnel || selectedPartners.length === 0}
                className={`w-full py-3 text-white text-xs rounded ${
                  selectedCampaign && selectedFunnel && selectedPartners.length > 0
                    ? "bg-[#1b1b1b]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {generatedLinks.length > 0 ? "Regenerate Tracking Link" : "Generate Tracking Link"}
              </button>
            </div>
          )}
        </div>

        {/* Generated Links - visible as long as there are links */}
        {generatedLinks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs text-gray-500 mb-4">Generated Links</h2>
            {generatedLinks.map((link) => (
              <div key={link.id} className="mb-4">
                <p className="text-xs text-black mb-2">{link.id} {link.name}</p>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded">
                  <span className="text-xs text-gray-400 flex-1 truncate">{link.url}</span>
                  <button
                    onClick={() => copyToClipboard(link.id, link.url)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0 relative w-4 h-4"
                  >
                    <svg
                      className={`w-4 h-4 absolute inset-0 transition-opacity duration-200 ${copiedId === link.id ? "opacity-0" : "opacity-100"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg
                      className={`w-4 h-4 absolute inset-0 transition-opacity duration-200 ${copiedId === link.id ? "opacity-100" : "opacity-0"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(campaignOpen || funnelOpen || partnersOpen) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setCampaignOpen(false);
            setFunnelOpen(false);
            setPartnersOpen(false);
          }}
        />
      )}
    </div>
  );
}
