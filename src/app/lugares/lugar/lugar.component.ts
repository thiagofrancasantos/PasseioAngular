import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = []

  constructor(
    private categoriaService: CategoriaService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log('Iniciando as categorias da api');
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => {
        console.log('Categorias obtidas com sucesso', listaCategorias);
        this.categorias = listaCategorias;
      },
      error: err => console.error('Erro ao obter categorias', err)
    });
  }

  salvar(){
    console.log('Valores: ', this.camposForm.value);
  }

}
