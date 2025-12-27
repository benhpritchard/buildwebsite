import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Search, ArrowUpCircle, MapPin, RotateCcw, Save, Home, X, ChevronLeft, Pencil, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

import {
  AvatarCatalog,
  OfficeCatalog,
  Locations,
  OfficeTiers,
  AvatarBundles,
  START_POINTS,
  defaultPlayerState,
  money,
  byId,
  canAfford,
  uid,
  HAIR_OPTIONS,
  AVATAR_OPTIONS,
  OUTFITS_OPTIONS,
  TRANSPORT_OPTIONS,
  ACCESSORIES_OPTIONS,
  BACKGROUND_OPTIONS,
  AVATAR_CATEGORIES,
  DEFAULT_BASE_IMAGE,
  AVATAR_BACKGROUND_DEFAULT,
} from "./avatarData";

const PAGE_SIZE = 6;

// Map category IDs to their option arrays
const getCategoryOptions = (categoryId) => {
  const mapping = {
    avatar: AVATAR_OPTIONS,
    hair: HAIR_OPTIONS,
    outfits: OUTFITS_OPTIONS,
    transport: TRANSPORT_OPTIONS,
    accessories: ACCESSORIES_OPTIONS,
    background: BACKGROUND_OPTIONS,
  };
  return mapping[categoryId] || [];
};

const finquestStyles = `
.finquest-root {
  --fq-blue-dark: #0b3b7c;
  --fq-blue: #1185e0;
  --fq-blue-light: #29a5ff;
  --fq-orange: #f6a623;
  --fq-cream: #ffe2b7;
  --fq-bg: #ffd7a0;
  --fq-green: #22b455;
  font-family: "Baloo 2", "Nunito", system-ui, -apple-system, sans-serif;
  background: var(--fq-bg);
  padding: 16px;
  color: #05233d;
  min-height: 100vh;
}
.fq-panel { background: #ffe9c7; border-radius: 22px; border: 4px solid var(--fq-blue-dark); box-shadow: 0 6px 0 rgba(6, 46, 96, 0.9); padding: 16px; }
.fq-header { background: linear-gradient(180deg, var(--fq-blue-light), var(--fq-blue)); border-radius: 22px; border: 4px solid var(--fq-blue-dark); box-shadow: 0 6px 0 rgba(6, 46, 96, 0.9); color: #fff; padding: 10px 18px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
.fq-header-title { font-size: 20px; font-weight: 800; letter-spacing: 0.03em; text-shadow: 0 2px 0 rgba(5, 32, 71, 0.9); }
.fq-points-pill { background: var(--fq-orange); color: #2b1600; border-radius: 16px; border: 3px solid #e08500; padding: 4px 12px; font-weight: 700; box-shadow: 0 3px 0 rgba(176, 96, 0, 0.9); }
.fq-tabs { display: flex; gap: 4px; margin-bottom: 8px; flex-wrap: wrap; }
.fq-tab { flex: 1; min-width: 70px; text-align: center; padding: 8px 4px; font-size: 13px; font-weight: 700; border-radius: 16px 16px 0 0; border: 3px solid var(--fq-blue-dark); border-bottom-width: 0; background: #fcd3a2; cursor: pointer; }
.fq-tab:hover { background: #ffe4c0; }
.fq-tab--active { background: #fff8e8; position: relative; }
.fq-tab--active::after { content: ""; position: absolute; left: 15%; right: 15%; bottom: -4px; height: 4px; background: var(--fq-orange); border-radius: 999px; }
.fq-card { background: #fff8e8; border-radius: 18px; border: 3px solid var(--fq-blue-dark); padding: 12px; margin-bottom: 10px; }
.fq-card-title { font-size: 16px; font-weight: 800; margin-bottom: 6px; color: var(--fq-blue-dark); }
.fq-btn { display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 6px 14px; border-radius: 18px; border: 3px solid #0b2b5a; background: linear-gradient(180deg, var(--fq-blue-light), var(--fq-blue)); color: #fff; font-weight: 800; font-size: 14px; box-shadow: 0 4px 0 rgba(4, 31, 67, 0.9); cursor: pointer; }
.fq-btn:hover { opacity: 0.95; }
.fq-btn--green { border-color: #167b37; background: linear-gradient(180deg, #35d46a, #22b455); box-shadow: 0 4px 0 rgba(14, 115, 49, 0.9); }
.fq-btn--orange { border-color: #c47a00; background: linear-gradient(180deg, #ffb84d, var(--fq-orange)); box-shadow: 0 4px 0 rgba(150, 100, 0, 0.9); color: #2b1600; }
.fq-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(4, 31, 67, 0.7); }
.fq-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.fq-caption { font-size: 12px; opacity: 0.9; }
  .fq-office-panel { height: 220px; border-radius: 18px; border: 3px solid var(--fq-blue-dark); background: linear-gradient(180deg, #e0f3ff, #c5e8ff); overflow: hidden; position: relative; }
  .fq-avatar-panel { height: 220px; border-radius: 18px; border: 3px solid var(--fq-blue-dark); background-size: cover; background-position: center; overflow: hidden; position: relative; }
  .fq-search { background: #fff8e8; border: 3px solid var(--fq-blue-dark); border-radius: 14px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.fq-search input { flex: 1; border: none; background: transparent; outline: none; font-size: 14px; }
.fq-item-card { background: #fff8e8; border-radius: 14px; border: 3px solid var(--fq-blue-dark); padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.fq-item-card--owned { border-color: var(--fq-green); }
.fq-item-card--equipped { border-color: var(--fq-orange); background: #fff3d9; }
.fq-item-preview { aspect-ratio: 1; background: #e8f4ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.fq-item-name { font-size: 11px; font-weight: 700; color: var(--fq-blue-dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fq-item-price { font-size: 10px; color: #666; }
.fq-pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px; }
.fq-pagination button { padding: 4px 12px; border-radius: 12px; border: 2px solid var(--fq-blue-dark); background: #fff8e8; font-weight: 700; font-size: 12px; cursor: pointer; }
.fq-office-grid { display: grid; width: 100%; height: 100%; background: linear-gradient(#cbe7ff, #a6cfff); }
.fq-office-grid-cell { border: 1px solid rgba(19, 70, 130, 0.3); }
.fq-office-grid-cell:hover { background: rgba(255, 255, 255, 0.3); }
`;

export default function FinQuestAvatarOffice({ student, onSave }) {
  const [tab, setTab] = useState("characters");
  const [state, setState] = useState(() => {
    // Load from student data if available
    if (student?.avatar_state) {
      return student.avatar_state;
    }
    return defaultPlayerState();
  });
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [saving, setSaving] = useState(false);
  const [selectedOfficeItem, setSelectedOfficeItem] = useState(null);
  const [characterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(state.playerDetails || defaultPlayerState().playerDetails);
  const [isEditingDetails, setIsEditingDetails] = useState(!state.playerDetails?.isLocked);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('base');
  const [isEditingOffice, setIsEditingOffice] = useState(false);
  const [selectedOfficeItemInstance, setSelectedOfficeItemInstance] = useState(null);

  const spend = (price) => setState((s) => ({ ...s, points: Math.max(0, s.points - price) }));
  const earn = (amount) => setState((s) => ({ ...s, points: s.points + amount }));

  const purchasePart = (part) => {
    const owned = state.avatar?.owned || [];
    if (owned.includes(part.id)) return true;
    if (!canAfford(state.points, part.price)) return false;
    spend(part.price);
    setState((s) => ({ ...s, avatar: { ...s.avatar, owned: [...(s.avatar?.owned || []), part.id] } }));
    return true;
  };

  const equipPart = (part) => {
    const owned = state.avatar?.owned || [];
    
    // Build updates object with mutual exclusion logic
    const updates = { [part.layer]: part.id };
    
    // Mutual exclusion: tops and jackets replace each other
    if (part.layer === 'tops') {
      updates.jackets = null; // Remove jacket when equipping a top
    } else if (part.layer === 'jackets') {
      updates.tops = null; // Remove top when equipping a jacket
    }
    
    // If item costs points and not owned, purchase it first
    if (part.price > 0 && !owned.includes(part.id)) {
      if (!canAfford(state.points, part.price)) return;
      spend(part.price);
      setState((s) => ({ 
        ...s, 
        avatar: { 
          ...s.avatar, 
          ...updates,
          owned: [...(s.avatar?.owned || []), part.id] 
        } 
      }));
    } else {
      // Already owned or free - just equip it (replaces current)
      setState((s) => ({ ...s, avatar: { ...s.avatar, ...updates } }));
    }
  };

  const updateLayerPosition = (layer, position) => {
    setState((s) => ({
      ...s,
      avatar: {
        ...s.avatar,
        layerPositions: {
          ...s.avatar?.layerPositions,
          [layer]: position,
        },
      },
    }));
  };

  const adjustLayerScale = (layer, delta) => {
    const currentScale = state.avatar?.layerPositions?.[layer]?.scale || 1;
    const newScale = Math.max(0.3, Math.min(2, currentScale + delta * 0.01));
    updateLayerPosition(layer, {
      ...state.avatar?.layerPositions?.[layer],
      scale: newScale,
    });
  };

  // Default clothing to apply when user removes all clothes
  const DEFAULT_TOP = 'top-white-tee';
  const DEFAULT_BOTTOMS = 'bottoms-1';

  const unequipItem = (layer) => {
    setState((s) => {
      const newAvatar = { ...s.avatar, [layer]: null };
      
      // If removing tops/jackets and no other top layer exists, add default top
      if ((layer === 'tops' || layer === 'jackets') && !newAvatar.tops && !newAvatar.jackets) {
        newAvatar.tops = DEFAULT_TOP;
      }
      
      // If removing bottoms and none left, add default bottoms
      if (layer === 'bottoms' && !newAvatar.bottoms) {
        newAvatar.bottoms = DEFAULT_BOTTOMS;
      }
      
      return { ...s, avatar: newAvatar };
    });
  };

  const purchaseItem = (item) => {
    if (state.office.ownedItemIds.includes(item.id)) return true;
    if (!canAfford(state.points, item.price)) return false;
    spend(item.price);
    setState((s) => ({ ...s, office: { ...s.office, ownedItemIds: [...s.office.ownedItemIds, item.id] } }));
    return true;
  };

  const placeItem = (item, x, y) => {
    if (!state.office.ownedItemIds.includes(item.id)) {
      const ok = purchaseItem(item);
      if (!ok) return;
    }
    const instance = { instanceId: uid(), itemId: item.id, x, y, scale: 1 };
    setState((s) => ({ ...s, office: { ...s.office, placed: [...s.office.placed, instance] } }));
    setSelectedOfficeItem(null);
  };

  const updateOfficeItemPosition = (instanceId, position) => {
    setState((s) => ({
      ...s,
      office: {
        ...s.office,
        placed: s.office.placed.map(p => 
          p.instanceId === instanceId ? { ...p, ...position } : p
        ),
      },
    }));
  };

  const adjustOfficeItemScale = (instanceId, delta) => {
    setState((s) => ({
      ...s,
      office: {
        ...s.office,
        placed: s.office.placed.map(p => {
          if (p.instanceId !== instanceId) return p;
          const newScale = Math.max(0.1, (p.scale || 1) + delta);
          return { ...p, scale: newScale };
        }),
      },
    }));
  };

  const rotateOfficeItem = (instanceId, delta) => {
    setState((s) => ({
      ...s,
      office: {
        ...s.office,
        placed: s.office.placed.map(p => {
          if (p.instanceId !== instanceId) return p;
          const newRotation = ((p.rotation || 0) + delta) % 360;
          return { ...p, rotation: newRotation };
        }),
      },
    }));
  };

  const removePlaced = (instanceId) => setState((s) => ({ ...s, office: { ...s.office, placed: s.office.placed.filter((p) => p.instanceId !== instanceId) } }));

  const sellItem = (instanceId) => {
    const placedItem = state.office.placed.find(p => p.instanceId === instanceId);
    if (!placedItem) return;
    const item = byId(OfficeCatalog, placedItem.itemId);
    if (!item) return;
    const sellPrice = Math.floor(item.price / 2);
    earn(sellPrice);
    removePlaced(instanceId);
    setSelectedOfficeItemInstance(null);
  };
  
  const resetAll = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setState(defaultPlayerState());
    }
  };

  const upgradeOfficeTier = () => {
    const currentTier = state.office.tier;
    const next = OfficeTiers.find((t) => t.level === currentTier + 1);
    if (!next) return;
    if (!canAfford(state.points, next.price)) return;
    spend(next.price);
    setState((s) => ({ ...s, office: { ...s.office, tier: next.level } }));
  };

  const moveLocation = (loc) => {
    if (state.locationId === loc.id) return;
    if (!canAfford(state.points, loc.price)) return;
    spend(loc.price);
    // Add bonus items to owned items
    const newOwnedItems = [...state.office.ownedItemIds];
    if (loc.bonusItems) {
      loc.bonusItems.forEach(itemId => {
        if (!newOwnedItems.includes(itemId)) {
          newOwnedItems.push(itemId);
        }
      });
    }
    setState((s) => ({ ...s, locationId: loc.id, office: { ...s.office, ownedItemIds: newOwnedItems } }));
  };

  const purchaseBundle = (bundle) => {
    if (!canAfford(state.points, bundle.cost)) return;
    spend(bundle.cost);
    setState((s) => ({ ...s, avatar: { ...s.avatar, owned: Array.from(new Set([...(s.avatar?.owned || []), ...bundle.unlock])) } }));
  };

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updatedState = { ...state, playerDetails: { ...playerDetails, isLocked: !isEditingDetails } };
      await base44.entities.Student.update(student.id, {
        avatar_state: updatedState,
        has_created_avatar: true,
        dream_job: playerDetails.dreamJob,
        school: playerDetails.school,
      });
      // Update localStorage so changes persist when navigating
      const storedStudent = localStorage.getItem('finnquest_student') || localStorage.getItem('finquest_student');
      if (storedStudent) {
        const studentData = JSON.parse(storedStudent);
        studentData.avatar_state = updatedState;
        studentData.has_created_avatar = true;
        studentData.dream_job = playerDetails.dreamJob;
        studentData.school = playerDetails.school;
        localStorage.setItem('finnquest_student', JSON.stringify(studentData));
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      if (onSave) onSave(updatedState);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const currentTier = OfficeTiers.find((t) => t.level === state.office.tier);
  const currentLocation = byId(Locations, state.locationId);

  const filteredAvatarParts = useMemo(() => 
    AvatarCatalog.filter((a) => 
      a.name.toLowerCase().includes(filter.toLowerCase()) || 
      (a.tags || []).join(" ").toLowerCase().includes(filter.toLowerCase())
    ), [filter]);
  
  const filteredOffice = useMemo(() => {
    let items = OfficeCatalog.filter((o) => 
      o.name.toLowerCase().includes(filter.toLowerCase()) || 
      (o.tags || []).join(" ").toLowerCase().includes(filter.toLowerCase())
    );
    
    // Sort: Desks, Lighting, Tech, then others. All sorted by price.
    items.sort((a, b) => {
      const catOrder = { desk: 1, lighting: 2, tech: 3 };
      const orderA = catOrder[a.category] || 4;
      const orderB = catOrder[b.category] || 4;
      
      if (orderA !== orderB) return orderA - orderB;
      return a.price - b.price;
    });
    
    return items;
  }, [filter]);

  const avatarPage = filteredAvatarParts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const officePage = filteredOffice.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="finquest-root">
      <style>{finquestStyles}</style>
      {/* HEADER */}
      <header className="fq-header">
        <div className="fq-header-title">Your Avatar</div>
        <div className="flex items-center gap-3">
          {/* Coins Display */}
          <div className="fq-points-pill">{state.points} coins</div>

          {/* Score Display */}
          <div className="flex items-center gap-2 bg-black/20 rounded-xl px-3 py-1 border-2 border-black/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Score</span>
              <span className="font-black text-lg text-yellow-300 drop-shadow-sm">0</span>
          </div>
          
          {/* Level Display */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 border-2 border-indigo-800 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-sm">
              Level: Rookie
          </div>

          <div className="h-6 w-px bg-white/20 mx-1"></div>

          <Link to={createPageUrl("ExploreGames")}>
            <button className="fq-btn text-xs">
              <Gamepad2 className="w-4 h-4" /> Games
            </button>
          </Link>
          <Link to={createPageUrl("StudentDashboard")}>
            <button className="fq-btn text-xs">
              <Home className="w-4 h-4" /> Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* TOP ROW: Avatar/Details + Tabs side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* LEFT: Avatar + Player Details */}
        <div className="fq-panel">
          <div className="fq-card grid grid-cols-5 gap-4">
            {/* Avatar Preview */}
            <div className="col-span-3">
              <div className="fq-card-title flex items-center justify-between text-sm">
                Your Avatar
                {!isEditingAvatar ? (
                  <button onClick={() => setIsEditingAvatar(true)} className="fq-btn text-[10px] px-2 py-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                ) : (
                  <button onClick={() => setIsEditingAvatar(false)} className="fq-btn fq-btn--green text-[10px] px-2 py-1">
                    <Save className="w-3 h-3" /> Done
                  </button>
                )}
              </div>
              <AvatarPreview 
                state={state} 
                isEditing={isEditingAvatar} 
                onUpdateLayerPosition={updateLayerPosition}
                selectedLayer={selectedLayer}
                setSelectedLayer={setSelectedLayer}
              />
              {isEditingAvatar && (
                <div className="mt-2 flex items-center gap-1 justify-center flex-wrap">
                  <span className="text-[10px] font-bold">Select:</span>
                  <button 
                    className={`fq-btn text-[10px] px-2 py-1 ${selectedLayer === 'base' ? 'fq-btn--orange' : ''}`} 
                    onClick={() => setSelectedLayer('base')}
                  >
                    Avatar
                  </button>
                  {state.avatar?.hair && state.avatar.hair !== 'hair-none' && (
                    <button 
                      className={`fq-btn text-[10px] px-2 py-1 ${selectedLayer === 'hair' ? 'fq-btn--orange' : ''}`} 
                      onClick={() => setSelectedLayer('hair')}
                    >
                      Hair
                      <X className="w-3 h-3 ml-1 text-red-300 hover:text-red-500" onClick={(e) => { e.stopPropagation(); unequipItem('hair'); }} />
                    </button>
                  )}
                  {state.avatar?.transport && state.avatar.transport !== 'transport-none' && (
                    <button 
                      className={`fq-btn text-[10px] px-2 py-1 ${selectedLayer === 'transport' ? 'fq-btn--orange' : ''}`} 
                      onClick={() => setSelectedLayer('transport')}
                    >
                      Transport
                      <X className="w-3 h-3 ml-1 text-red-300 hover:text-red-500" onClick={(e) => { e.stopPropagation(); unequipItem('transport'); }} />
                    </button>
                  )}
                  <span className="text-[10px] font-bold ml-2">Size:</span>
                  <button className="fq-btn text-[10px] px-2 py-1" onClick={() => adjustLayerScale(selectedLayer, -10)}>−</button>
                  <span className="text-[10px] w-8 text-center">
                    {Math.round((state.avatar?.layerPositions?.[selectedLayer]?.scale || 1) * 100)}%
                  </span>
                  <button className="fq-btn text-[10px] px-2 py-1" onClick={() => adjustLayerScale(selectedLayer, 10)}>+</button>
                </div>
              )}
              <div className="mt-2 flex gap-1 flex-wrap">
                <button className="fq-btn text-[10px] px-2 py-1" onClick={() => setTab("characters")}>Customize</button>
                <button className="fq-btn fq-btn--green text-[10px] px-2 py-1" onClick={handleSave} disabled={saving}>
                  <Save className="w-3 h-3" /> {saving ? "..." : "Save"}
                </button>
                <button className="fq-btn text-[10px] px-2 py-1" onClick={resetAll}>
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Player Details */}
            <div className="col-span-2">
              <div className="fq-card-title flex items-center justify-between text-sm">
                Player Details
                {!isEditingDetails && (
                  <button onClick={() => setIsEditingDetails(true)} className="fq-btn text-[10px] px-2 py-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <div>
                  <label className="text-[10px] font-bold text-gray-600">Name</label>
                  <input
                    type="text"
                    value={playerDetails.name}
                    onChange={(e) => setPlayerDetails(prev => ({ ...prev, name: e.target.value }))}
                    readOnly={!isEditingDetails}
                    className={`w-full p-1.5 border-2 rounded-lg text-xs ${isEditingDetails ? 'border-blue-400 bg-white' : 'border-gray-200 bg-gray-100'}`}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600">Dream Job</label>
                  <input
                    type="text"
                    value={playerDetails.dreamJob}
                    onChange={(e) => setPlayerDetails(prev => ({ ...prev, dreamJob: e.target.value }))}
                    readOnly={!isEditingDetails}
                    className={`w-full p-1.5 border-2 rounded-lg text-xs ${isEditingDetails ? 'border-blue-400 bg-white' : 'border-gray-200 bg-gray-100'}`}
                    placeholder="What's your dream job?"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600">School</label>
                  <input
                    type="text"
                    value={playerDetails.school}
                    onChange={(e) => setPlayerDetails(prev => ({ ...prev, school: e.target.value }))}
                    readOnly={!isEditingDetails}
                    className={`w-full p-1.5 border-2 rounded-lg text-xs ${isEditingDetails ? 'border-blue-400 bg-white' : 'border-gray-200 bg-gray-100'}`}
                    placeholder="Your school name"
                  />
                  <p className="text-[8px] text-gray-500 mt-1 italic">Note: You may need to re-add your hair after changing outfits</p>
                </div>
                {isEditingDetails && (
                  <button 
                    onClick={() => setIsEditingDetails(false)} 
                    className="fq-btn fq-btn--green w-full text-[10px] px-2 py-1"
                  >
                    <Save className="w-3 h-3" /> Submit
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT: Tabs + Content */}
        <div className="fq-panel">
          <div className="fq-tabs">
            <button className={`fq-tab ${tab === "characters" ? "fq-tab--active" : ""}`} onClick={() => { setTab("characters"); setPage(0); }}>Characters</button>
            <button className={`fq-tab ${tab === "office" ? "fq-tab--active" : ""}`} onClick={() => { setTab("office"); setPage(0); }}>Office</button>
            <button className={`fq-tab ${tab === "locations" ? "fq-tab--active" : ""}`} onClick={() => setTab("locations")}>Locations</button>
          </div>

          {/* Search */}
          {tab === "office" && (
            <div className="fq-search">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                placeholder="Search items..." 
                value={filter} 
                onChange={(e) => { setFilter(e.target.value); setPage(0); }} 
              />
            </div>
          )}

          {/* TAB CONTENT */}
          {tab === "characters" && (
            <div className="fq-card">
              <div className="fq-card-title">Customize Your Character</div>
              <p className="fq-caption mb-4">Select a category to customize your business person!</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {AVATAR_CATEGORIES.map((cat) => {
                  const options = getCategoryOptions(cat.id);
                  const hasOptions = options.length > 0;
                  const currentSelection = state.avatar[cat.id];
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (hasOptions) {
                          setSelectedCategory(cat.id);
                          setCharacterModalOpen(true);
                        }
                      }}
                      className={`fq-item-card cursor-pointer transition-transform hover:scale-105 ${!hasOptions ? "opacity-50" : ""}`}
                      disabled={!hasOptions}
                    >
                      <div className="fq-item-preview h-12 flex items-center justify-center">
                        <span className="text-2xl">{cat.emoji}</span>
                      </div>
                      <div className="fq-item-name text-center text-[10px]">{cat.name}</div>
                      <div className="text-[9px] text-center text-gray-500">
                        {hasOptions ? `${options.length}` : "Soon"}
                      </div>
                      {currentSelection && (
                        <div className="text-[9px] text-center text-green-600 font-bold">✓</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "office" && (
                        <div className="fq-card">
                          <div className="fq-card-title text-sm">Office Items {selectedOfficeItem && <span className="text-xs font-normal">(Selected: {selectedOfficeItem.name})</span>}</div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {officePage.map((item) => (
                              <ItemCard 
                                key={item.id} 
                                item={item} 
                                selected={selectedOfficeItem?.id === item.id}
                                isOwned={state.office.ownedItemIds.includes(item.id)}
                                points={state.points} 
                                onSelect={() => setSelectedOfficeItem(item)} 
                              />
                            ))}
                          </div>
                          <Pagination page={page} pageSize={PAGE_SIZE} total={filteredOffice.length} onPage={setPage} />
                        </div>
                      )}



          {tab === "locations" && (
            <div className="fq-card">
              <div className="fq-card-title text-sm">Move Location</div>
              <p className="fq-caption mb-2 text-xs">Upgrade your office! Better locations = better vibes.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Locations.map((loc, index) => (
                          <div key={loc.id} className={`fq-item-card ${state.locationId === loc.id ? "fq-item-card--equipped" : ""}`}>
                            {/* Mini office preview */}
                            <div className="fq-item-preview h-16 relative overflow-hidden rounded-lg">
                              {loc.image ? (
                                <img 
                                  src={loc.image} 
                                  alt={loc.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                                  Coming Soon
                                </div>
                              )}
                            </div>
                            <div className="fq-item-name text-[10px]">{loc.name}</div>
                            <div className="fq-item-price text-[9px]">{loc.price === 0 ? "Free" : money(loc.price)}</div>
                            {loc.description && (
                              <div className="text-[8px] text-gray-500 truncate">{loc.description}</div>
                            )}
                            {loc.bonusItems?.length > 0 && (
                              <div className="text-[8px] text-green-600 font-bold">+{loc.bonusItems.length} items</div>
                            )}
                            <button 
                              className={`fq-btn text-[9px] px-2 py-0.5 ${state.locationId === loc.id ? "" : (loc.image && canAfford(state.points, loc.price)) ? "fq-btn--green" : ""}`}
                              onClick={() => moveLocation(loc)} 
                              disabled={state.locationId === loc.id || !loc.image || !canAfford(state.points, loc.price)}
                            >
                              {state.locationId === loc.id ? "Current" : loc.image ? "Move" : "Soon"}
                            </button>
                          </div>
                        ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM: Large Office View */}
      <div className="fq-panel">
        <div className="fq-card">
          <div className="fq-card-title flex items-center justify-between">
            Your Home Office
            {!isEditingOffice ? (
              <button onClick={() => setIsEditingOffice(true)} className="fq-btn text-xs">
                <Pencil className="w-3 h-3" /> Edit
              </button>
            ) : (
              <button onClick={() => { setIsEditingOffice(false); setSelectedOfficeItemInstance(null); }} className="fq-btn fq-btn--green text-xs">
                <Save className="w-3 h-3" /> Done
              </button>
            )}
          </div>
          <OfficePreview 
            state={state} 
            onRemove={removePlaced}
            onSellItem={sellItem}
            location={currentLocation}
            selectedItem={selectedOfficeItem}
            onPlace={placeItem}
            isEditing={isEditingOffice}
            onUpdateItemPosition={updateOfficeItemPosition}
            selectedOfficeItemInstance={selectedOfficeItemInstance}
            setSelectedOfficeItemInstance={setSelectedOfficeItemInstance}
            large={true}
          />
          {isEditingOffice && selectedOfficeItemInstance && (
            <div className="mt-2 flex items-center gap-4 justify-center flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">Size:</span>
                <button className="fq-btn text-xs" onClick={() => adjustOfficeItemScale(selectedOfficeItemInstance, -0.1)}>−</button>
                <span className="text-xs w-12 text-center">
                  {Math.round((state.office.placed.find(p => p.instanceId === selectedOfficeItemInstance)?.scale || 1) * 100)}%
                </span>
                <button className="fq-btn text-xs" onClick={() => adjustOfficeItemScale(selectedOfficeItemInstance, 0.1)}>+</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">Rotate:</span>
                <button className="fq-btn text-xs" onClick={() => rotateOfficeItem(selectedOfficeItemInstance, -15)}>◀</button>
                <span className="text-xs w-10 text-center">
                  {state.office.placed.find(p => p.instanceId === selectedOfficeItemInstance)?.rotation || 0}°
                </span>
                <button className="fq-btn text-xs" onClick={() => rotateOfficeItem(selectedOfficeItemInstance, 15)}>▶</button>
              </div>
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div className="fq-caption">
              Location: {currentLocation?.name} • Click on "Office" tab above to buy items, then click in the room to place them
            </div>
            <button className="fq-btn fq-btn--green text-xs" onClick={handleSave} disabled={saving}>
              <Save className="w-3 h-3" /> {saving ? "Saving..." : saveSuccess ? "Saved! ✓" : "Save Office"}
            </button>
          </div>
        </div>
      </div>

      {/* Character Customization Modal */}
      {characterModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffe9c7] rounded-2xl border-4 border-[#0b3b7c] shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#29a5ff] to-[#1185e0] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-white hover:bg-white/20 rounded-full p-1"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-white font-bold text-xl">
                  {AVATAR_CATEGORIES.find(c => c.id === selectedCategory)?.emoji}{" "}
                  {AVATAR_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h2>
              </div>
              <button 
                onClick={() => { setCharacterModalOpen(false); setSelectedCategory(null); }}
                className="text-white hover:bg-white/20 rounded-full p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {getCategoryOptions(selectedCategory).map((option) => {
                  const isEquipped = state.avatar[selectedCategory] === option.id;
                  const isOwned = (state.avatar?.owned || []).includes(option.id) || option.price === 0;
                  const canBuy = canAfford(state.points, option.price);
                  
                  return (
                    <div
                      key={option.id}
                      onClick={() => equipPart(option)}
                      className={`fq-item-card cursor-pointer transition-transform hover:scale-105 ${
                        isEquipped ? "fq-item-card--equipped" : isOwned ? "fq-item-card--owned" : ""
                      } ${!isOwned && !canBuy ? "opacity-50" : ""}`}
                    >
                      <div className="fq-item-preview h-20 flex items-center justify-center overflow-hidden">
                        {option.image ? (
                          <img src={option.image} alt={option.name} className="w-full h-full object-contain" />
                        ) : option.color ? (
                          <div 
                            className="w-12 h-12 rounded-full border-2 border-gray-400"
                            style={{ backgroundColor: option.color }}
                          />
                        ) : (
                          <span className="text-2xl text-gray-400">∅</span>
                        )}
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-[10px] text-gray-600 block">{option.name}</span>
                        {option.price > 0 && !isOwned && (
                          <span className="text-[9px] text-orange-600 font-bold">{money(option.price)}</span>
                        )}
                        <span className={`text-xs font-bold block ${isEquipped ? "text-orange-600" : isOwned ? "text-green-600" : canBuy ? "text-blue-600" : "text-gray-400"}`}>
                          {isEquipped ? "✓ Equipped" : isOwned ? "Equip" : canBuy ? "Buy & Equip" : "Not enough pts"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {getCategoryOptions(selectedCategory).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No options available yet</p>
                  <p className="text-sm">Coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------
// SUB-COMPONENTS
// -----------------------------

function AvatarPreview({ state, isEditing, onUpdateLayerPosition, selectedLayer, setSelectedLayer }) {
  const selectedHair = HAIR_OPTIONS.find(h => h.id === state.avatar?.hair);
  const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === state.avatar?.avatar) || AVATAR_OPTIONS[0];
  const selectedOutfit = OUTFITS_OPTIONS.find(o => o.id === state.avatar?.outfits);
  const selectedTransport = TRANSPORT_OPTIONS.find(t => t.id === state.avatar?.transport);
  const selectedBackground = BACKGROUND_OPTIONS.find(b => b.id === state.avatar?.background) || BACKGROUND_OPTIONS[0];
  
  const hasOutfit = selectedOutfit?.image || selectedOutfit?.avatarImages;
  const getOutfitImage = () => {
    if (!selectedOutfit) return null;
    if (selectedOutfit.avatarImages && state.avatar?.avatar) {
      return selectedOutfit.avatarImages[state.avatar.avatar] || selectedOutfit.image;
    }
    return selectedOutfit.image;
  };
  const avatarImage = hasOutfit 
    ? getOutfitImage() 
    : selectedAvatar?.image || DEFAULT_BASE_IMAGE;
  
  const basePosition = state.avatar?.layerPositions?.base || { x: 0, y: 0, scale: 1 };
  const hairPosition = state.avatar?.layerPositions?.hair || { x: 0, y: 0, scale: 1 };
  const transportPosition = state.avatar?.layerPositions?.transport || { x: 0, y: 0, scale: 1 };
  
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [dragLayer, setDragLayer] = React.useState(null);
  
  const handleDragStart = (e, layer, isTouch) => {
    if (!isEditing) return;
    if (!isTouch) e.preventDefault(); // Prevent default only for mouse to avoid text selection
    e.stopPropagation();
    
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
    setIsDragging(true);
    setDragLayer(layer);
    setSelectedLayer(layer);
    setDragStart({ 
      x: clientX, 
      y: clientY,
      startPosX: state.avatar?.layerPositions?.[layer]?.x || 0,
      startPosY: state.avatar?.layerPositions?.[layer]?.y || 0,
    });
  };
  
  React.useEffect(() => {
    if (!isDragging || !dragLayer) return;
    
    const onMove = (e) => {
      const isTouch = e.type === 'touchmove';
      if (isTouch) {
        // Prevent scrolling while dragging
        e.preventDefault();
      }
      
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;
      
      onUpdateLayerPosition(dragLayer, {
        ...state.avatar?.layerPositions?.[dragLayer],
        x: dragStart.startPosX + deltaX,
        y: dragStart.startPosY + deltaY,
      });
    };
    
    const onEnd = () => {
      setIsDragging(false);
      setDragLayer(null);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
    
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, dragLayer, dragStart]);
  
  return (
    <div 
      className="fq-avatar-panel flex items-center justify-between h-48 relative overflow-hidden px-4"
      style={{ backgroundImage: `url(${selectedBackground?.image || AVATAR_BACKGROUND_DEFAULT})` }}
    >
      {/* Main Avatar Container - Shifted Left */}
      <div 
        className="relative flex items-end justify-center"
        style={{
          width: '240px',
          height: '240px',
          transform: `translate(${basePosition.x}px, ${basePosition.y}px) scale(${basePosition.scale})`,
          marginLeft: '-20px', // Shift slightly left to make room
        }}
      >
        <div 
          className={`h-full w-full flex items-center justify-center select-none ${isEditing ? 'cursor-move' : ''} ${isEditing && selectedLayer === 'base' ? 'ring-2 ring-blue-400 ring-dashed' : ''}`}
          onMouseDown={(e) => handleDragStart(e, 'base', false)}
          onTouchStart={(e) => handleDragStart(e, 'base', true)}
        >
          <img 
            src={avatarImage} 
            alt="Base"
            className="h-full w-auto object-contain"
            draggable={false}
          />
        </div>
        {/* Hair layer */}
        {selectedHair?.image && (
          <img 
            src={selectedHair.image} 
            alt="Hair"
            className={`absolute object-contain select-none ${isEditing ? 'cursor-move' : ''} ${isEditing && selectedLayer === 'hair' ? 'ring-2 ring-orange-400 ring-dashed' : ''}`}
            style={{ 
              zIndex: 10,
              left: `calc(50% + ${hairPosition.x}px)`,
              top: `${hairPosition.y}px`,
              transform: `translateX(-50%) scale(${hairPosition.scale})`,
              width: '60px', 
            }}
            onMouseDown={(e) => handleDragStart(e, 'hair', false)}
            onTouchStart={(e) => handleDragStart(e, 'hair', true)}
            draggable={false}
          />
        )}
      </div>
      
      {/* Transport layer - Explicitly on Right */}
      {selectedTransport?.image && (
        <div
          className={`absolute object-contain select-none ${isEditing ? 'cursor-move' : ''} ${isEditing && selectedLayer === 'transport' ? 'ring-2 ring-green-400 ring-dashed' : ''}`}
          style={{ 
            zIndex: 5,
            right: '20px',
            bottom: '10px',
            width: '100px',
            transform: `translate(${transportPosition.x}px, ${transportPosition.y}px) scale(${transportPosition.scale})`,
          }}
          onMouseDown={(e) => handleDragStart(e, 'transport', false)}
          onTouchStart={(e) => handleDragStart(e, 'transport', true)}
        >
          <img 
            src={selectedTransport.image} 
            alt="Transport"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      )}
      
      {isEditing && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs p-2 rounded text-center z-20 pointer-events-none">
          Click & drag to move • Use controls below to resize
        </div>
      )}
    </div>
  );
}



function getPartColor(partId) {
  if (!partId) return "#1185e0";
  const colors = {
    navy: "#001f3f", charcoal: "#36454F", black: "#222", taupe: "#483C32",
    khaki: "#C3B091", stone: "#928E85", teal: "#008080", burgundy: "#800020",
    forest: "#228B22", royal: "#4169E1", brown: "#8B4513", tan: "#D2B48C", white: "#F5F5F5"
  };
  for (const [color, hex] of Object.entries(colors)) {
    if (partId.includes(color)) return hex;
  }
  return "#1185e0";
}

function OfficePreview({ state, onRemove, onSellItem, location, selectedItem, onPlace, isEditing, onUpdateItemPosition, selectedOfficeItemInstance, setSelectedOfficeItemInstance, large = false }) {
  const containerRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [dragInstanceId, setDragInstanceId] = React.useState(null);

  const handleDragStart = (e, instanceId, isTouch) => {
    if (!isEditing) return;
    if (!isTouch) e.preventDefault();
    e.stopPropagation();
    
    const item = state.office.placed.find(p => p.instanceId === instanceId);
    if (!item) return;
    
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
    setIsDragging(true);
    setDragInstanceId(instanceId);
    setSelectedOfficeItemInstance(instanceId);
    setDragStart({
      x: clientX,
      y: clientY,
      startPosX: item.x || 50,
      startPosY: item.y || 50,
    });
  };

  React.useEffect(() => {
    if (!isDragging || !dragInstanceId) return;

    const onMove = (e) => {
      if (!containerRef.current) return;
      
      const isTouch = e.type === 'touchmove';
      if (isTouch) e.preventDefault();
      
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;
      
      // Convert to percentage
      const newX = Math.max(0, Math.min(100, dragStart.startPosX + (deltaX / rect.width) * 100));
      const newY = Math.max(0, Math.min(100, dragStart.startPosY + (deltaY / rect.height) * 100));
      
      onUpdateItemPosition(dragInstanceId, { x: newX, y: newY });
    };

    const onEnd = () => {
      setIsDragging(false);
      setDragInstanceId(null);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, dragInstanceId, dragStart]);

  const handleRoomClick = (e) => {
    if (!selectedItem || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPlace(selectedItem, x, y);
  };

  // Get selected item for sell price display
  const selectedPlacedItem = state.office.placed.find(p => p.instanceId === selectedOfficeItemInstance);
  const selectedItemData = selectedPlacedItem ? byId(OfficeCatalog, selectedPlacedItem.itemId) : null;
  const sellPrice = selectedItemData ? Math.floor(selectedItemData.price / 2) : 0;

  return (
    <div 
      ref={containerRef}
      className="fq-office-panel relative cursor-pointer overflow-hidden" 
      style={{ height: large ? '350px' : '220px' }}
      onClick={handleRoomClick}
    >
      {/* Left Achievement Wall - Pinboard Style */}
      <div className="absolute left-0 top-0 bottom-0 z-10 overflow-hidden"
        style={{
          width: '22%',
          background: 'linear-gradient(135deg, #C4A484 0%, #8B7355 50%, #6B5344 100%)',
          borderRight: '6px solid #4A3728',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Cork texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #8B6914 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }} />
        {/* Header */}
        <div className="relative z-10 text-center py-3 px-1">
          <div className="text-lg font-black text-yellow-400 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            🏆
          </div>
          <div className="text-[10px] font-black text-white tracking-wide" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            MY ACHIEVEMENTS
          </div>
        </div>
        {/* Badges pinned to board */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-2">
          {(state.badges || []).map((badge, i) => (
            <div key={i} className="relative cursor-pointer hover:scale-110 transition-transform">
              {/* Pin */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 border-2 border-red-700 shadow-md z-20" />
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-3 border-yellow-600 flex items-center justify-center text-lg shadow-lg mt-1">
                🏅
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Certificate Wall - Pinboard Style */}
      <div className="absolute right-0 top-0 bottom-0 z-10 overflow-hidden"
        style={{
          width: '22%',
          background: 'linear-gradient(225deg, #C4A484 0%, #8B7355 50%, #6B5344 100%)',
          borderLeft: '6px solid #4A3728',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Cork texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #8B6914 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }} />
        {/* Header */}
        <div className="relative z-10 text-center py-3 px-1">
          <div className="text-lg font-black text-yellow-400 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            🎓
          </div>
          <div className="text-[10px] font-black text-white tracking-wide" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            MY LEARNING
          </div>
        </div>
        {/* Certificates pinned to board */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-2">
          {/* Welcome Certificate - always present */}
          <CertificateItem 
            title="🎉 Welcome to FinQuest! 🎉" 
            description="Congratulations on starting your financial literacy journey! You're taking the first step towards becoming a money-smart superstar!"
            date={new Date().toLocaleDateString()}
          />
          {(state.certificates || []).map((cert, i) => (
            <CertificateItem key={i} {...cert} />
          ))}
        </div>
      </div>

      {/* Main Office Area - Background image for location */}
      <div className="absolute top-0 bottom-0" style={{ left: '21%', right: '21%' }}>
        {location?.image ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#d4c4a8]">
            <img 
              src={location.image} 
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <>
            {/* Fallback basic room */}
            <div className="absolute top-0 left-0 right-0 h-[60%] bg-[#e8e4de]" />
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-[#8b7355]" />
          </>
        )}

        {/* Placed items */}
        {state.office.placed.map((p) => {
          const it = byId(OfficeCatalog, p.itemId);
          if (!it) return null;
          const isSelected = selectedOfficeItemInstance === p.instanceId;
          const scale = p.scale || 1;
          // Adjust position to be relative to middle area
          const adjustedX = ((p.x || 50) - 21) / 58 * 100;
          
          return (
            <div 
              key={p.instanceId}
              className={`absolute flex flex-col items-center justify-end select-none ${isEditing ? 'cursor-move' : ''} ${isSelected ? 'ring-2 ring-orange-400 ring-dashed rounded' : ''}`}
              style={{ 
                left: `${adjustedX}%`, 
                top: `${p.y || 60}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                zIndex: Math.min(Math.round(p.y || 60), 40),
              }}
              onMouseDown={(e) => handleDragStart(e, p.instanceId, false)}
              onTouchStart={(e) => handleDragStart(e, p.instanceId, true)}
              onClick={(e) => {
                e.stopPropagation();
                if (isEditing) setSelectedOfficeItemInstance(p.instanceId);
              }}
            >
              {it.image ? (
                <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img 
                    src={it.image} 
                    alt={it.name} 
                    className="object-contain"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      transform: `rotateY(${p.rotation || 0}deg)`,
                      filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.2))'
                    }} 
                  />
                </div>
              ) : (
                <div className="text-4xl" style={{ transform: `rotateY(${p.rotation || 0}deg)`, transformStyle: 'preserve-3d' }}>{it.emoji || getCategoryEmoji(it.category)}</div>
              )}
            </div>
          );
        })}
      </div>

      {isEditing && (
        <div className="absolute bottom-2 left-[21%] right-[21%] bg-black/50 text-white text-xs p-2 rounded text-center z-20">
          Click to place • Drag items to move • Select item to resize/sell
          {selectedOfficeItemInstance && selectedItemData && (
            <button 
              onClick={(e) => { e.stopPropagation(); onSellItem(selectedOfficeItemInstance); }}
              className="ml-2 bg-yellow-500 text-black px-2 py-0.5 rounded font-bold hover:bg-yellow-400"
            >
              Sell for {sellPrice} pts
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function CertificateItem({ title, description, date }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>${title}</title></head>
        <body style="display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;font-family:Georgia,serif;background:linear-gradient(135deg,#667eea,#764ba2);">
          <div style="background:linear-gradient(180deg,#FFF8DC,#F5E6C8);border:12px solid #8B4513;border-radius:20px;padding:50px;text-align:center;max-width:650px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="font-size:60px;margin-bottom:10px;">🏆🎓🏆</div>
            <h1 style="color:#8B4513;margin-bottom:5px;font-size:32px;">Certificate of Achievement</h1>
            <div style="width:100px;height:4px;background:linear-gradient(90deg,#FFD700,#FFA500);margin:10px auto 20px;border-radius:2px;"></div>
            <h2 style="color:#2C1810;font-size:28px;margin-bottom:15px;">${title}</h2>
            <p style="color:#5D4037;margin:25px 0;font-size:18px;line-height:1.6;">${description || ''}</p>
            <div style="font-size:40px;margin:20px 0;">⭐✨⭐</div>
            <p style="color:#8B4513;font-size:14px;margin-bottom:20px;">Awarded: ${date || new Date().toLocaleDateString()}</p>
            <div style="margin-top:30px;border-top:3px solid #8B4513;padding-top:20px;">
              <p style="font-style:italic;color:#8B4513;font-size:20px;font-weight:bold;">FinQuest Academy</p>
              <p style="color:#666;font-size:12px;margin-top:5px;">Building Financial Superstars!</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div 
        className="relative cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        {/* Pin */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 border-2 border-red-700 shadow-md z-20" />
        <div className="w-14 h-8 bg-gradient-to-b from-[#FFF8DC] to-[#F5E6C8] border-2 border-[#8B4513] rounded-sm flex items-center justify-center text-sm shadow-lg mt-1"
          style={{ boxShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
        >
          📜
        </div>
      </div>
      {isOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 999999 }} onClick={() => setIsOpen(false)}>
          <div 
            className="bg-gradient-to-r from-[#FFF8DC] to-[#F5E6C8] p-4 text-center rounded-lg"
            style={{ 
              border: '6px solid #8B4513',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              width: '400px',
              maxWidth: '90vw'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-2xl mb-1">🏆🎓🏆</div>
            <h2 className="text-lg font-black text-[#8B4513] mb-1">Certificate of Achievement</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-2" />
            <h3 className="text-base font-bold text-[#2C1810] mb-2">{title}</h3>
            {description && <p className="text-sm text-[#5D4037] mb-2">{description}</p>}
            <div className="text-xl mb-2">⭐✨⭐</div>
            <p className="text-xs text-[#8B4513] mb-3">Awarded: {date || new Date().toLocaleDateString()}</p>
            <div className="border-t-2 border-[#8B4513] pt-2 mb-3">
              <p className="italic text-[#8B4513] text-sm font-bold">FinQuest Academy</p>
            </div>
            <div className="flex gap-2 justify-center">
              <button onClick={handlePrint} className="bg-[#8B4513] text-white px-3 py-1.5 rounded text-sm font-bold hover:opacity-90">
                🖨️ Print
              </button>
              <button onClick={() => setIsOpen(false)} className="bg-gray-500 text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-gray-600">
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function PartCard({ part, owned, equipped, points, onEquip }) {
  const affordable = canAfford(points, part.price) || owned;
  return (
    <div className={`fq-item-card ${equipped ? "fq-item-card--equipped" : owned ? "fq-item-card--owned" : ""}`}>
      <div className="fq-item-preview">
        <div className="text-2xl">{getLayerEmoji(part.layer)}</div>
      </div>
      <div className="fq-item-name truncate">{part.name}</div>
      <div className="fq-item-price">{part.price === 0 ? "Free" : money(part.price)}</div>
      <button 
        className={`fq-btn text-xs w-full ${affordable ? (equipped ? "" : "fq-btn--green") : ""}`}
        onClick={onEquip} 
        disabled={!affordable || equipped}
      >
        {owned ? (equipped ? "Equipped" : "Equip") : "Buy"}
      </button>
    </div>
  );
}

function ItemCard({ item, selected, points, onSelect, isOwned }) {
  const affordable = canAfford(points, item.price);
  const tierColors = {
    basic: "bg-blue-100 text-blue-700",
    standard: "bg-green-100 text-green-700",
    premium: "bg-orange-100 text-orange-700",
    elite: "bg-red-100 text-red-700",
    fun: "bg-purple-100 text-purple-700",
  };
  return (
    <div className={`fq-item-card ${selected ? "fq-item-card--equipped" : ""}`}>
      <div className="fq-item-preview h-16 flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
        ) : (
          <div className="text-4xl">{item.emoji || getCategoryEmoji(item.category)}</div>
        )}
      </div>
      <div className="fq-item-name text-xs font-bold text-center">{item.name}</div>
      <div className="flex items-center justify-between mt-1">
        <div className="fq-item-price text-sm font-bold">{money(item.price)}</div>
        {item.tier && <span className={`text-[9px] px-2 py-0.5 rounded ${tierColors[item.tier] || ''}`}>{item.tier}</span>}
      </div>
      <button 
        className={`fq-btn text-xs px-2 py-1 w-full mt-1 ${isOwned || affordable ? "fq-btn--green" : ""}`}
        onClick={onSelect} 
        disabled={!isOwned && !affordable}
      >
        {isOwned ? "Place" : "Buy & Place"}
      </button>
    </div>
  );
}

function Pagination({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  return (
    <div className="fq-pagination">
      <button onClick={() => onPage(Math.max(0, page - 1))} disabled={page === 0}>Prev</button>
      <span className="text-sm">Page {page + 1} / {pages}</span>
      <button onClick={() => onPage(Math.min(pages - 1, page + 1))} disabled={page >= pages - 1}>Next</button>
    </div>
  );
}

function getLayerEmoji(layer) {
  const emojis = {
    base: "👤", head: "🗣️", hair: "💇", brows: "🤨", eyes: "👁️", nose: "👃", mouth: "👄",
    facialHair: "🧔", glasses: "👓", top: "👔", jacket: "🧥", bottom: "👖", shoes: "👞", accessory: "⌚"
  };
  return emojis[layer] || "✨";
}

function getCategoryEmoji(category) {
  const emojis = {
    desk: "🗄️", chair: "🪑", storage: "📦", lighting: "💡", plant: "🌿",
    tech: "🖥️", art: "🖼️", appliance: "🧊", decor: "🎨", trophy: "🏆"
  };
  return emojis[category] || "📦";
}