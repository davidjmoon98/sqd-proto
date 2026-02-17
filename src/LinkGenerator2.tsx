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

export default function LinkGenerator2() {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [selectedFunnel, setSelectedFunnel] = useState<typeof funnels[0] | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<typeof partners>([]);

  const [campaignOpen, setCampaignOpen] = useState(false);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);

  const [campaignSearch, setCampaignSearch] = useState("");
  const [funnelSearch, setFunnelSearch] = useState("");
  const [partnerSearch, setPartnerSearch] = useState("");

  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // SubIDs state
  const [subIdsOpen, setSubIdsOpen] = useState(false);
  const [subId1, setSubId1] = useState("");
  const [subId2, setSubId2] = useState("");
  const [subId3, setSubId3] = useState("");

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

  const handleGenerate = () => {
    if (selectedCampaign && selectedFunnel && selectedPartners.length > 0) {
      const links = selectedPartners.map(partner => {
        const baseUrl = "wefjwenfinuwefiwneiwnefi.cafwefw";
        const params = new URLSearchParams();
        if (subId1) params.append("c1", subId1);
        if (subId2) params.append("c2", subId2);
        if (subId3) params.append("c3", subId3);
        const queryString = params.toString();
        return {
          id: partner.id,
          name: partner.name,
          url: queryString ? `${baseUrl}?${queryString}` : baseUrl,
        };
      });
      setGeneratedLinks(links);
    }
  };

  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const canGenerate = selectedCampaign && selectedFunnel && selectedPartners.length > 0;

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      {/* Title */}
      <h1 className="text-sm text-black mb-8">Generate Tracking Links</h1>

      {/* Input Box */}
      <div className="border border-gray-200 rounded-lg p-6 mb-8">
        {/* Input Row */}
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-start gap-4">
          {/* Campaign Dropdown */}
          <div className="relative">
            <div
              onClick={() => setCampaignOpen(!campaignOpen)}
              className="px-4 py-3 bg-gray-100 rounded-lg text-xs cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {selectedCampaign ? (
                <span className="text-black">{selectedCampaign.name}</span>
              ) : (
                <span className="text-gray-400">Select Campaign</span>
              )}
            </div>
            {campaignOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-auto">
                <input
                  type="text"
                  placeholder="Search"
                  value={campaignSearch}
                  onChange={(e) => setCampaignSearch(e.target.value)}
                  className="w-full px-4 py-2 text-xs placeholder-gray-400 outline-none border-b border-gray-100"
                  autoFocus
                />
                {filteredCampaigns.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setCampaignOpen(false);
                      setCampaignSearch("");
                      // Reset funnel and partners when campaign changes
                      setSelectedFunnel(null);
                      setSelectedPartners([]);
                    }}
                    className="w-full text-left px-4 py-3 text-xs text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    {campaign.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Funnel Dropdown */}
          <div className="relative">
            <div
              onClick={() => selectedCampaign && setFunnelOpen(!funnelOpen)}
              className={`px-4 py-3 bg-gray-100 rounded-lg text-xs transition-colors ${
                selectedCampaign ? "cursor-pointer hover:bg-gray-200" : "cursor-not-allowed opacity-50"
              }`}
            >
              {selectedFunnel ? (
                <span className="text-black">{selectedFunnel.name}</span>
              ) : (
                <span className="text-gray-400">Select Funnel</span>
              )}
            </div>
            {funnelOpen && selectedCampaign && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-auto">
                <input
                  type="text"
                  placeholder="Search"
                  value={funnelSearch}
                  onChange={(e) => setFunnelSearch(e.target.value)}
                  className="w-full px-4 py-2 text-xs placeholder-gray-400 outline-none border-b border-gray-100"
                  autoFocus
                />
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

          {/* Partners Dropdown */}
          <div className="relative">
            <div
              onClick={() => selectedCampaign && setPartnersOpen(!partnersOpen)}
              className={`px-4 py-3 bg-gray-100 rounded-lg text-xs transition-colors ${
                selectedCampaign ? "cursor-pointer hover:bg-gray-200" : "cursor-not-allowed opacity-50"
              }`}
            >
              {selectedPartners.length > 0 ? (
                <span className="text-black truncate">
                  {selectedPartners.map(p => p.id).join(", ")}
                </span>
              ) : (
                <span className="text-gray-400">Partners</span>
              )}
            </div>
            {partnersOpen && selectedCampaign && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-auto">
                <input
                  type="text"
                  placeholder="Search"
                  value={partnerSearch}
                  onChange={(e) => setPartnerSearch(e.target.value)}
                  className="w-full px-4 py-2 text-xs placeholder-gray-400 outline-none border-b border-gray-100"
                  autoFocus
                />
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

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`px-6 py-3 text-white text-xs rounded-lg whitespace-nowrap ${
              canGenerate ? "bg-[#1b1b1b]" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Generate Link
          </button>
        </div>

        {/* Add SubIDs Toggle */}
        <button
          onClick={() => setSubIdsOpen(!subIdsOpen)}
          className="flex items-center gap-2 mt-6 text-xs text-gray-400 hover:text-black transition-colors"
        >
          <svg
            className={`w-3 h-3 transition-transform ${subIdsOpen ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Add SubIDs (Optional)
        </button>

        {/* SubIDs Fields */}
        {subIdsOpen && (
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 mt-4">
            <input
              type="text"
              placeholder="c1"
              value={subId1}
              onChange={(e) => setSubId1(e.target.value)}
              className="px-4 py-3 bg-gray-100 rounded-lg text-xs placeholder-gray-400 outline-none"
            />
            <input
              type="text"
              placeholder="c2"
              value={subId2}
              onChange={(e) => setSubId2(e.target.value)}
              className="px-4 py-3 bg-gray-100 rounded-lg text-xs placeholder-gray-400 outline-none"
            />
            <input
              type="text"
              placeholder="c3"
              value={subId3}
              onChange={(e) => setSubId3(e.target.value)}
              className="px-4 py-3 bg-gray-100 rounded-lg text-xs placeholder-gray-400 outline-none"
            />
            {/* Spacer to match Generate button width */}
            <div className="px-6 py-3 invisible text-xs">Generate Link</div>
          </div>
        )}
      </div>

      {/* Content Area */}
      {generatedLinks.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Please select above<br />
            fields to generate Links
          </p>
        </div>
      ) : (
        /* Generated Links Table */
        <div className="border-t border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-[150px_1fr_40px] py-3 border-b border-gray-100">
            <span className="text-xs text-gray-400">Partner</span>
            <span className="text-xs text-gray-400">Tracking Link</span>
            <span></span>
          </div>
          {/* Table Rows */}
          {generatedLinks.map((link) => (
            <div key={link.id} className="grid grid-cols-[150px_1fr_40px] py-4 border-b border-gray-100 items-center">
              <div>
                <p className="text-xs text-black">{link.id}</p>
                <p className="text-xs text-black">{link.name}</p>
              </div>
              <span className="text-xs text-black truncate pr-4">{link.url}</span>
              <button
                onClick={() => copyToClipboard(link.id, link.url)}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0 relative w-4 h-4 justify-self-end"
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
          ))}
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(campaignOpen || funnelOpen || partnersOpen) && (
        <div
          className="fixed inset-0 z-10"
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
