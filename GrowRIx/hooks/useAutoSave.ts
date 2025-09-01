import { useEffect, useRef, useState, useCallback } from 'react';

type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
}

interface UseAutoSaveReturn {
  status: AutoSaveStatus;
  error?: string;
}

export function useAutoSave<T>({ 
  data, 
  onSave, 
  delay = 1000 
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [error, setError] = useState<string | undefined>();
  const timeoutRef = useRef<number | null>(null);
  const initialDataRef = useRef<T | null>(null);
  const isMountedRef = useRef(true);

  // Set initial data on first render
  useEffect(() => {
    if (initialDataRef.current === null) {
      initialDataRef.current = data;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const saveData = useCallback(async (dataToSave: T) => {
    if (!isMountedRef.current) return;
    
    try {
      setStatus('saving');
      setError(undefined);
      await onSave(dataToSave);
      
      if (isMountedRef.current) {
        setStatus('saved');
        // Auto-reset to idle after showing "saved" for 2 seconds
        setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle');
          }
        }, 2000);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Save failed');
      }
    }
  }, [onSave]);

  useEffect(() => {
    // Don't autosave on initial mount
    if (initialDataRef.current === null) return;
    
    // Clear existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Check if data actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(initialDataRef.current);
    if (!hasChanged) return;

    // Set new timeout
    timeoutRef.current = window.setTimeout(() => {
      saveData(data);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, saveData]);

  return { status, error };
}

// Legacy function for backwards compatibility
export function useAutoSave_legacy(value: any, delay = 1000) {
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      // noop placeholder for autosave
      // console.log('autosave', value)
    }, delay);

    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, [value, delay]);
}
