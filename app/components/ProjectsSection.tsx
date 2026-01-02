"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const ProjectsSection = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [youtubeLinks, setYoutubeLinks] = useState<Array<{url: string; id: string; title?: string; thumb?: string;}>>([]);
  const DEFAULT_LINKS: Array<{url: string; id: string; title?: string; thumb?: string}> = [
    { url: 'https://youtu.be/Q9--SOFyeGY?si=OOvaX_f_cjUVmMNb', id: 'Q9--SOFyeGY', title: 'Highlights of Jesus Bracho', thumb: '/images/Projects/IMG_4753.jpeg' },
    { url: 'https://youtu.be/ni89LR2XVjk?si=_Yp9PQiuQM5nsQau', id: 'ni89LR2XVjk', title: 'Highlights of Jesus Bracho 2', thumb: '/images/Projects/IMG_4755.jpeg' }
  ];
  const [newLink, setNewLink] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newThumb, setNewThumb] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  // Load saved links from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("youtubeLinks");
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{url:string;id:string;title?:string;thumb?:string}>;
        // merge defaults: add any default links that are missing by id
        // and fill missing title/thumb from defaults
        const map = new Map(parsed.map((p) => [p.id, p]));
        DEFAULT_LINKS.forEach((d) => {
          const existing = map.get(d.id);
          if (!existing) {
            map.set(d.id, d);
          } else {
            // fill missing fields if default provides them
            if (!existing.title && d.title) existing.title = d.title;
            if (!existing.thumb && d.thumb) existing.thumb = d.thumb;
          }
        });
        setYoutubeLinks(Array.from(map.values()));
      } else {
        // if no saved links, fall back to defaults
        setYoutubeLinks(DEFAULT_LINKS);
      }
    } catch (e) {
      // ignore
      setYoutubeLinks(DEFAULT_LINKS);
    }
  }, []);

  // Persist links to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("youtubeLinks", JSON.stringify(youtubeLinks));
    } catch (e) {
      // ignore
    }
  }, [youtubeLinks]);

  const extractYouTubeId = (url: string) => {
    // support formats like: https://www.youtube.com/watch?v=ID, https://youtu.be/ID, with params
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1);
      }
      if (u.searchParams.has("v")) return u.searchParams.get("v");
      // sometimes embed urls
      const parts = u.pathname.split("/").filter(Boolean);
      return parts.length ? parts[parts.length - 1] : null;
    } catch (e) {
      return null;
    }
  };

  const addLink = () => {
    const id = extractYouTubeId(newLink.trim());
    if (!id) {
      alert("Por favor pega una URL válida de YouTube.");
      return;
    }
    if (youtubeLinks.some((l) => l.id === id)) {
      alert("Este video ya fue agregado.");
      return;
    }
    setYoutubeLinks((prev) => [{ url: newLink.trim(), id, title: newTitle || undefined, thumb: newThumb ?? undefined }, ...prev]);
    setNewLink("");
    setNewTitle("");
    setNewThumb(null);
  };

  const handleNewThumbFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNewThumb(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeItemThumb = (id: string, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setYoutubeLinks((prev) => prev.map((l) => (l.id === id ? { ...l, thumb: data } : l)));
    };
    reader.readAsDataURL(file);
  };

  const removeLink = (id: string) => {
    setYoutubeLinks((prev) => prev.filter((l) => l.id !== id));
    if (previewIndex !== null) setPreviewIndex(null);
  };

  return (
    <section ref={ref} className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-white">My Projects</h2>



        {/* Links list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeLinks.length === 0 && (
            <div className="text-gray-400">No hay videos agregados todavía.</div>
          )}

          {youtubeLinks.map((linkObj) => (
            <div key={linkObj.id} className="bg-[#0f0f0f] rounded-lg overflow-hidden border border-white/10 shadow-md">
              <a href={linkObj.url} target="_blank" rel="noreferrer" className="block h-52 w-full overflow-hidden">
                <img src={linkObj.thumb ?? `https://img.youtube.com/vi/${linkObj.id}/hqdefault.jpg`} alt={linkObj.title ?? 'Video'} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </a>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg">{linkObj.title ?? 'My Video'}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;