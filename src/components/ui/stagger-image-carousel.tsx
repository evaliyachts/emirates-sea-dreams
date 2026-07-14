"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { YachtMediaRecord } from "@/data/yachts";

interface Props { images: readonly YachtMediaRecord[]; altPrefix?: string; fallbackSrc: string }
type UsableImage = YachtMediaRecord & { carouselId: string };

export const StaggerImageCarousel = ({ images, altPrefix = "Yacht image", fallbackSrc }: Props) => {
  const reduceMotion = useReducedMotion();
  const sourceImages = useMemo(() => images.map((image, index) => ({ ...image, carouselId: `${image.path}-${index}` })), [images]);
  const [imageList, setImageList] = useState<UsableImage[]>(sourceImages);
  const [cardSize, setCardSize] = useState(365);
  const [fullscreen, setFullscreen] = useState<UsableImage | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  useEffect(() => { setImageList(sourceImages); setFailed(new Set()); setFullscreen(null); }, [sourceImages]);
  useEffect(() => {
    const update = () => setCardSize(window.matchMedia("(min-width: 640px)").matches ? 420 : 300);
    update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update);
  }, []);

  const move = (steps: number) => setImageList((current) => {
    if (current.length < 2) return current;
    const next = [...current];
    if (steps > 0) for (let index = 0; index < steps; index += 1) { const first = next.shift(); if (first) next.push(first); }
    if (steps < 0) for (let index = 0; index > steps; index -= 1) { const last = next.pop(); if (last) next.unshift(last); }
    return next;
  });
  const removeFailed = (image: UsableImage) => {
    if (failed.has(image.path)) return;
    setFailed((current) => new Set(current).add(image.path));
    setImageList((current) => current.filter((item) => item.carouselId !== image.carouselId));
    if (fullscreen?.carouselId === image.carouselId) setFullscreen(null);
  };

  const displayed = imageList.length ? imageList : [{ type: "image", path: fallbackSrc, alt: `${altPrefix} placeholder`, width: 1200, height: 800, rightsRecordId: "fallback", rightsStatus: "approved", carouselId: "fallback" } satisfies UsableImage];
  const centerIndex = Math.floor(displayed.length / 2);
  const currentPosition = images.findIndex((item) => item.path === displayed[centerIndex]?.path) + 1;
  const visibleCards = displayed
    .map((image, index) => ({ image, position: index - centerIndex }))
    .filter(({ position }) => Math.abs(position) <= 2);

  return (
    <section aria-label={`${altPrefix} image gallery`} onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}>
      <p className="sr-only" aria-live="polite">Image {Math.max(1, currentPosition)} of {Math.max(1, images.length)}</p>
      <div className="relative w-full overflow-hidden" style={{ height: cardSize * 0.65 + 80 }}>
        {visibleCards.map(({ image, position }) => {
          const isCenter = position === 0;
          return <button
            type="button"
            key={image.carouselId}
            onClick={() => isCenter ? setFullscreen(image) : move(position)}
            aria-label={isCenter ? `Open ${image.alt} fullscreen` : `Select ${image.alt}`}
            className={cn("absolute left-1/2 top-1/2 cursor-pointer border-2 overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-primary", !reduceMotion && "transition-all duration-500 ease-in-out", isCenter ? "z-10 border-primary/60 shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.4)]" : "z-0 border-border/40 hover:border-primary/30")}
            style={{ width: cardSize, height: cardSize * 0.65, transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg) scale(${isCenter ? 1 : 0.9})` }}
          ><img src={image.path} alt={image.alt} width={image.width} height={image.height} loading={isCenter ? "eager" : "lazy"} {...(isCenter ? { fetchpriority: "high" } : {})} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={() => image.path !== fallbackSrc && removeFailed(image)} /></button>;
        })}
        {displayed.length > 1 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button type="button" onClick={() => move(-1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground" aria-label="Previous image"><ChevronLeft className="w-5 h-5" /></button>
          <button type="button" onClick={() => move(1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground" aria-label="Next image"><ChevronRight className="w-5 h-5" /></button>
        </div>}
      </div>
      <Dialog open={Boolean(fullscreen)} onOpenChange={(open) => !open && setFullscreen(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-black/95 flex items-center justify-center">
          <DialogTitle className="sr-only">Fullscreen yacht image</DialogTitle>
          {fullscreen && <img src={fullscreen.path} alt={fullscreen.alt} width={fullscreen.width} height={fullscreen.height} className="max-w-full max-h-[90vh] object-contain" referrerPolicy="no-referrer" onError={() => removeFailed(fullscreen)} />}
        </DialogContent>
      </Dialog>
    </section>
  );
};
