import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search } from 'lucide-react'

interface SearchModalProps {
  onSearch: (query: string) => void
}

export function SearchModal({ onSearch }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buscar medicamentos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Buscar por nombre o laboratorio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

